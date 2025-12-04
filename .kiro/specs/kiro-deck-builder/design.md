# Design Document

## Overview

The Kiro Deck Builder is a web-based single-player card game built with Next.js and JavaScript. The game implements a deck-building mechanic where players use coding-themed cards to generate Task points and Specs, which are then used to complete bugs and features for points. The architecture follows a component-based approach with centralized game state management, ensuring smooth gameplay and elegant UI interactions.

The game uses shadcn/ui for the UI component library, providing a modern, accessible, and customizable foundation. The visual design leverages Kiro's brand colors (purple-500 #790ECB) on a dark theme, with smooth animations and clear visual feedback for all player actions.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Game Page Component                  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Game State Manager                  │  │  │
│  │  │  (useReducer + Context)                     │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                      │                            │  │
│  │         ┌────────────┼────────────┐               │  │
│  │         ▼            ▼            ▼               │  │
│  │   ┌─────────┐  ┌─────────┐  ┌─────────┐          │  │
│  │   │  Game   │  │  Card   │  │Resource │          │  │
│  │   │  Board  │  │Components│ │ Display │          │  │
│  │   └─────────┘  └─────────┘  └─────────┘          │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Game Logic Layer                     │  │
│  │  - Card Effects Engine                            │  │
│  │  - Challenge Completion Logic                     │  │
│  │  - Deck Management                                │  │
│  │  - Turn Flow Controller                           │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Data Layer                           │  │
│  │  - Card Definitions                               │  │
│  │  - Challenge Definitions                          │  │
│  │  - Game Constants                                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### UI Layout Structure

The game board uses a CSS Grid layout for optimal organization:

```
┌─────────────────────────────────────────────────────────────┐
│                      Resource Bar                           │
│  ⚡ Tasks: 8  │  📋 Specs: 2  │  ⭐ Score: 5  │  Turn: 7/20 │
└─────────────────────────────────────────────────────────────┘

┌──────────┬────────────────────────────┬──────────────────────┐
│  Deck    │      Play Area / Store     │   Active Challenge   │
│  (12)    │                            │                      │
│  [Card]  │  [Played Cards Grid]       │   [Challenge Card]   │
│          │                            │                      │
│          │                            │   ⚡ 5 Tasks         │
│          │                            │   📋 1 Spec          │
│          │                            │   ⭐ 2 Points        │
├──────────┼────────────────────────────┼──────────────────────┤
│          │  Discard  │  Player Hand   │  Phase & Actions     │
│          │   (8)     │  [5 Cards]     │  [End Phase Button]  │
│          │  [Card]   │                │                      │
└──────────┴───────────┴────────────────┴──────────────────────┘
```

**Grid Specifications:**
- Column 1 (200px): Deck pile (top)
- Column 2 (1fr): Play area/Store (top), Discard + Hand (bottom)
- Column 3 (300px): Challenge card (top), Phase controls (bottom)

**Emoji Conventions:**
- ⚡ **Tasks**: Used for task points (generation and costs)
- 📋 **Specs**: Used for spec points (generation and requirements)
- ⭐ **Points**: Used for score and point values

These emojis MUST be consistently used throughout the UI whenever referencing these resources.

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES6+)
- **UI Library**: shadcn/ui (built on Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom Kiro color palette
- **State Management**: React useReducer + Context API
- **Animation**: Framer Motion for card animations
- **Testing**: Vitest for unit tests
- **Server**: Next.js development server with custom logging middleware

## Components and Interfaces

### Core Components

#### 1. Card Component (`components/Card.jsx`)

The fundamental building block for all card displays in the game.

```javascript
// Props interface
{
  card: {
    id: string,
    name: string,
    type: 'action' | 'challenge',
    cost?: number,
    taskPoints?: number,
    specs?: number,
    cardDraw?: number,
    description: string,
    pointValue?: number,
    requiredTasks?: number,
    requiredSpecs?: number
  },
  showFront: boolean,
  onClick?: function,
  disabled?: boolean,
  className?: string
}
```

Features:
- Fixed dimensions: 200px × 280px
- Front face shows card details with Kiro branding
- Back face shows Kiro logo design
- Hover effects and click animations
- Disabled state styling

#### 2. GameBoard Component (`components/GameBoard.jsx`)

Main game layout container that orchestrates all game zones.

```javascript
// Props interface
{
  gameState: GameState,
  dispatch: function
}
```

Renders:
- Resource display (top bar)
- Active challenge (center)
- Player hand (bottom)
- Play area / Store (middle, phase-dependent)
- Deck and discard pile indicators (sides)

#### 3. Hand Component (`components/Hand.jsx`)

Displays the player's current hand of cards.

```javascript
// Props interface
{
  cards: Card[],
  onCardClick: function,
  disabled: boolean
}
```

Features:
- Fan layout for cards
- Hover to elevate card
- Click to play during play phase

#### 4. PlayArea Component (`components/PlayArea.jsx`)

Shows cards played during the current turn.

```javascript
// Props interface
{
  playedCards: Card[],
  phase: 'play' | 'buy'
}
```

Features:
- Horizontal layout of played cards
- Visible only during play phase

#### 5. Store Component (`components/Store.jsx`)

Displays purchasable cards during buy phase.

```javascript
// Props interface
{
  storeCards: Card[],
  onPurchase: function,
  currentTasks: number,
  disabled: boolean
}
```

Features:
- Shows 5 available cards
- Highlights affordable cards
- Click to purchase

#### 6. Challenge Component (`components/Challenge.jsx`)

Displays the active bug or feature to complete.

```javascript
// Props interface
{
  challenge: Card,
  currentTasks: number,
  currentSpecs: number,
  onComplete: function
}
```

Features:
- Shows requirements and rewards
- Progress indicator
- Complete button when requirements met

#### 7. ResourceDisplay Component (`components/ResourceDisplay.jsx`)

Shows current game state information.

```javascript
// Props interface
{
  tasks: number,
  specs: number,
  score: number,
  turn: number,
  maxTurns: number,
  phase: 'play' | 'buy'
}
```

Features:
- Displays "⚡ Tasks: {value}"
- Displays "📋 Specs: {value}"
- Displays "⭐ Score: {value}"
- Displays "Turn: {current}/{max}"
- Shows current phase indicator

#### 8. PhaseButton Component (`components/PhaseButton.jsx`)

Button to transition between phases.

```javascript
// Props interface
{
  phase: 'play' | 'buy',
  onClick: function,
  disabled: boolean
}
```

### Game State Management

#### GameState Structure

```javascript
{
  // Decks and cards
  playerDeck: Card[],
  discardPile: Card[],
  hand: Card[],
  playedCards: Card[],
  challengeDeck: Card[],
  completedChallenges: Card[],
  activeChallenge: Card | null,
  store: Card[],
  
  // Resources
  currentTasks: number,
  currentSpecs: number,
  score: number,
  
  // Game flow
  turn: number,
  phase: 'play' | 'buy',
  gameOver: boolean,
  
  // Constants
  maxTurns: 20,
  handSize: 5,
  storeSize: 5
}
```

#### Game Actions

```javascript
// Action types
{
  type: 'START_GAME',
  type: 'DRAW_CARDS',
  type: 'PLAY_CARD', payload: { cardId }
  type: 'COMPLETE_CHALLENGE',
  type: 'PURCHASE_CARD', payload: { cardId }
  type: 'END_PLAY_PHASE',
  type: 'END_BUY_PHASE',
  type: 'RESTART_GAME'
}
```

### Game Logic Layer

#### Card Effects Engine (`lib/cardEffects.js`)

```javascript
export function applyCardEffect(card, gameState) {
  // Returns updated gameState with card effects applied
  // Handles: task generation, spec generation, card draw
}
```

#### Deck Manager (`lib/deckManager.js`)

```javascript
export function drawCards(deck, discardPile, count) {
  // Returns { drawnCards, newDeck, newDiscard }
  // Handles reshuffling when deck is empty
}

export function shuffleDeck(cards) {
  // Returns shuffled array
}
```

#### Challenge Logic (`lib/challengeLogic.js`)

```javascript
export function canCompleteChallenge(challenge, tasks, specs) {
  // Returns boolean
}

export function completeChallenge(challenge, gameState) {
  // Returns updated gameState with challenge completed
}
```

#### Turn Controller (`lib/turnController.js`)

```javascript
export function endPlayPhase(gameState) {
  // Transitions to buy phase
}

export function endBuyPhase(gameState) {
  // Moves played cards to discard
  // Increments turn
  // Draws new hand
  // Resets resources
  // Transitions to play phase
}
```

## Data Models

### Card Model

```javascript
{
  id: string,              // Unique identifier
  name: string,            // Display name
  type: 'action' | 'challenge',
  
  // Action card properties
  cost: number,            // Purchase cost in tasks
  taskPoints: number,      // Tasks generated when played
  specs: number,           // Specs generated when played
  cardDraw: number,        // Cards drawn when played
  description: string,     // Effect description
  
  // Challenge card properties
  challengeType: 'bug' | 'feature',
  requiredTasks: number,   // Tasks needed to complete
  requiredSpecs: number,   // Specs needed to complete
  pointValue: number,      // Score awarded on completion
  flavorText: string       // Thematic description
}
```

### Initial Card Definitions

#### Starter Deck Cards (10 cards)

```javascript
[
  {
    id: 'basic-code-1',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 Task'
  },
  // 7 more Basic Code cards
  
  {
    id: 'quick-spec-1',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 Spec'
  },
  // 1 more Quick Spec card
]
```

#### Store Card Pool

```javascript
[
  {
    id: 'focused-coding',
    name: 'Focused Coding',
    type: 'action',
    cost: 3,
    taskPoints: 3,
    specs: 0,
    cardDraw: 0,
    description: '+3 Tasks'
  },
  {
    id: 'pair-programming',
    name: 'Pair Programming',
    type: 'action',
    cost: 4,
    taskPoints: 2,
    specs: 0,
    cardDraw: 1,
    description: '+2 Tasks, +1 Card'
  },
  {
    id: 'write-spec',
    name: 'Write Spec',
    type: 'action',
    cost: 3,
    taskPoints: 0,
    specs: 2,
    cardDraw: 0,
    description: '+2 Specs'
  },
  {
    id: 'code-review',
    name: 'Code Review',
    type: 'action',
    cost: 2,
    taskPoints: 1,
    specs: 1,
    cardDraw: 0,
    description: '+1 Task, +1 Spec'
  },
  {
    id: 'refactor',
    name: 'Refactor',
    type: 'action',
    cost: 5,
    taskPoints: 4,
    specs: 1,
    cardDraw: 0,
    description: '+4 Tasks, +1 Spec'
  },
  {
    id: 'ai-assist',
    name: 'AI Assist',
    type: 'action',
    cost: 4,
    taskPoints: 1,
    specs: 0,
    cardDraw: 2,
    description: '+1 Task, +2 Cards'
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    type: 'action',
    cost: 6,
    taskPoints: 5,
    specs: 0,
    cardDraw: 1,
    description: '+5 Tasks, +1 Card'
  }
]
```

#### Challenge Deck

```javascript
[
  // Easy bugs (3-4 tasks, 0 specs, 1 point)
  {
    id: 'typo-bug',
    name: 'Typo in Variable',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 3,
    requiredSpecs: 0,
    pointValue: 1,
    flavorText: 'A simple typo is breaking the build'
  },
  {
    id: 'missing-import',
    name: 'Missing Import',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 4,
    requiredSpecs: 0,
    pointValue: 1,
    flavorText: 'Module not found error'
  },
  
  // Medium bugs (5-6 tasks, 1 spec, 2 points)
  {
    id: 'null-pointer',
    name: 'Null Pointer Exception',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 5,
    requiredSpecs: 1,
    pointValue: 2,
    flavorText: 'Undefined is not a function'
  },
  {
    id: 'race-condition',
    name: 'Race Condition',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 6,
    requiredSpecs: 1,
    pointValue: 2,
    flavorText: 'Intermittent test failures'
  },
  
  // Easy features (4-5 tasks, 1 spec, 1 point)
  {
    id: 'add-button',
    name: 'Add Button Component',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 4,
    requiredSpecs: 1,
    pointValue: 1,
    flavorText: 'Create a reusable button'
  },
  {
    id: 'form-validation',
    name: 'Form Validation',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 5,
    requiredSpecs: 1,
    pointValue: 1,
    flavorText: 'Validate user input'
  },
  
  // Medium features (7-8 tasks, 2 specs, 2 points)
  {
    id: 'api-integration',
    name: 'API Integration',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 7,
    requiredSpecs: 2,
    pointValue: 2,
    flavorText: 'Connect to external service'
  },
  {
    id: 'user-auth',
    name: 'User Authentication',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 8,
    requiredSpecs: 2,
    pointValue: 2,
    flavorText: 'Implement login system'
  },
  
  // Hard challenges (9-10 tasks, 2-3 specs, 3 points)
  {
    id: 'performance-bug',
    name: 'Performance Bottleneck',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 9,
    requiredSpecs: 2,
    pointValue: 3,
    flavorText: 'App is running slow'
  },
  {
    id: 'complex-feature',
    name: 'Real-time Collaboration',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 10,
    requiredSpecs: 3,
    pointValue: 3,
    flavorText: 'Build WebSocket system'
  }
]
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all testable properties from the prework, several can be consolidated:

- Properties 7.1-7.4 (displaying resources in any phase) can be combined into one property about resource display persistence
- Properties 1.4 and card dimension testing can be verified once rather than repeatedly
- Properties about phase transitions (3.5, 5.5) can be combined into a turn flow property
- Many "example" tests are better suited as unit tests rather than properties

The following properties provide unique validation value without redundancy:

### Core Game Flow Properties

**Property 1: Turn initialization draws correct hand size**
*For any* game state at turn start, drawing cards should result in exactly 5 cards in hand (or fewer if deck + discard has fewer than 5 cards)
**Validates: Requirements 2.1, 2.3**

**Property 2: Playing cards accumulates resources correctly**
*For any* card with task points or specs, playing that card should increase the respective resource pool by the card's value
**Validates: Requirements 3.2, 3.3**

**Property 3: Card draw effects work correctly**
*For any* card with card draw value N, playing that card should increase hand size by N (up to maximum hand size)
**Validates: Requirements 8.5**

**Property 4: Challenge completion deducts resources and awards points**
*For any* challenge and sufficient resources, completing the challenge should deduct the required resources and increase score by the challenge's point value
**Validates: Requirements 4.2, 4.3**

**Property 5: Challenge replacement maintains one active challenge**
*For any* game state, after completing a challenge, there should be exactly one new active challenge drawn from the deck
**Validates: Requirements 4.4, 9.4**

**Property 6: Card purchase deducts cost and adds to discard**
*For any* store card and sufficient task points, purchasing should deduct the cost and add the card to the discard pile
**Validates: Requirements 5.2**

**Property 7: Store replenishment maintains store size**
*For any* card purchase, the store should maintain exactly 5 cards by drawing a replacement
**Validates: Requirements 5.3**

**Property 8: Phase transition cleans up correctly**
*For any* game state, ending buy phase should move all played cards to discard, increment turn counter, reset resources to 0, and draw a new hand
**Validates: Requirements 5.5, 6.2**

**Property 9: Resource display updates reactively**
*For any* resource change (tasks, specs, score, turn), the UI should immediately reflect the new values
**Validates: Requirements 7.5**

**Property 10: Insufficient resources prevent challenge completion**
*For any* challenge requiring specs, if the player has insufficient specs (even with sufficient tasks), the challenge cannot be completed
**Validates: Requirements 4.5**

**Property 11: Card dimensions are consistent**
*For any* rendered card, the dimensions should be exactly 200px wide by 280px tall
**Validates: Requirements 1.4**

**Property 12: Turn counter increments correctly**
*For any* sequence of turns, the turn counter should increase by 1 after each buy phase ends
**Validates: Requirements 6.2**

## Error Handling

### Deck Management Errors

- **Empty Deck Scenario**: When both player deck and discard pile are empty, draw only available cards without crashing
- **Invalid Card ID**: If a card ID doesn't exist, log error and skip the operation
- **Duplicate Card Play**: Prevent playing the same card instance twice

### Resource Validation

- **Negative Resources**: Prevent resources from going below zero
- **Insufficient Funds**: Disable purchase/completion buttons when resources are insufficient
- **Resource Overflow**: Handle large resource values gracefully (unlikely but possible with many card draws)

### Challenge Deck Management

- **Empty Challenge Deck**: Reshuffle completed challenges back into deck
- **No Completed Challenges**: If challenge deck is empty and no completed challenges exist, log warning and continue without active challenge

### UI Error States

- **Failed Card Render**: Show placeholder card if card data is malformed
- **Animation Errors**: Gracefully degrade to instant transitions if animations fail
- **Missing Assets**: Use fallback colors/designs if Kiro logo fails to load

### Server Errors

- **Logging Failures**: If file logging fails, fall back to console logging
- **Port Conflicts**: Handle port already in use gracefully

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific examples, edge cases, and component behavior using Vitest. Each major component and game logic function will have corresponding unit tests.

**Unit Test Coverage:**

1. **Component Tests**
   - Card component renders correctly with front/back
   - GameBoard displays all required zones
   - Hand component handles empty/full states
   - Store component shows correct number of cards
   - Challenge component displays requirements correctly
   - ResourceDisplay shows all values
   - PhaseButton changes text based on phase

2. **Game Logic Tests**
   - Initial game state is correct (turn 1, empty resources, starter deck)
   - Deck shuffling produces different order
   - Drawing from empty deck triggers reshuffle
   - Playing a card moves it to play area
   - Completing a challenge awards correct points
   - Purchasing a card adds to discard pile
   - Phase transitions update state correctly
   - Game ends at turn 20

3. **Edge Case Tests**
   - Drawing with empty deck and discard
   - Completing challenge with exact resources
   - Purchasing with exact cost
   - Hand at maximum size prevents draws
   - Challenge deck empty triggers reshuffle

### Property-Based Testing Approach

Property-based tests will verify universal properties using fast-check library. Each test will run a minimum of 100 iterations with randomly generated game states and inputs.

**PBT Configuration:**
- Library: fast-check
- Minimum iterations: 100 per property
- Seed: Random (logged for reproducibility)
- Shrinking: Enabled for minimal failing examples

**Property Test Implementation:**

Each property-based test must:
1. Be tagged with a comment referencing the design document property
2. Use format: `// Feature: kiro-deck-builder, Property {N}: {property text}`
3. Generate appropriate random inputs (game states, cards, resources)
4. Verify the property holds across all generated inputs
5. Use smart generators that constrain to valid input space

**Custom Generators Needed:**
- `arbitraryGameState()`: Generates valid game states
- `arbitraryCard()`: Generates valid action cards
- `arbitraryChallenge()`: Generates valid challenge cards
- `arbitraryResourceAmount()`: Generates reasonable resource values (0-50)
- `arbitraryPhase()`: Generates 'play' or 'buy'

**Property Test Files:**
- `__tests__/properties/gameFlow.test.js`: Properties 1, 8, 12
- `__tests__/properties/cardEffects.test.js`: Properties 2, 3
- `__tests__/properties/challenges.test.js`: Properties 4, 5, 10
- `__tests__/properties/store.test.js`: Properties 6, 7
- `__tests__/properties/ui.test.js`: Properties 9, 11

### Integration Testing

While not required for MVP, integration tests would verify:
- Full turn cycle (draw → play → buy → next turn)
- Complete game playthrough (20 turns)
- Win condition triggers correctly

### Testing Workflow

1. Write implementation code first
2. Write unit tests for specific examples and edge cases
3. Write property-based tests for universal properties
4. Run tests after each task completion
5. Fix any failing tests before proceeding
6. Maintain test coverage as features are added

### Test Execution

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm test -- --watch

# Run only unit tests
npm test -- unit

# Run only property tests
npm test -- properties

# Run with coverage
npm test -- --coverage
```

## Server Configuration

### Development Server

- **Framework**: Next.js built-in dev server
- **Port**: 3000 (default)
- **Hot Reload**: Enabled for rapid development

### Logging Configuration

Custom logging middleware will write to `logs/game.log`:

```javascript
// middleware.js
export function middleware(request) {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} - ${request.method} ${request.url}\n`;
  
  // Append to log file
  fs.appendFileSync('logs/game.log', log);
  
  return NextResponse.next();
}
```

**Log Format:**
```
2024-12-04T10:30:45.123Z - GET /
2024-12-04T10:30:45.456Z - GET /api/game/start
2024-12-04T10:30:47.789Z - POST /api/game/action
```

**Log Rotation**: For MVP, simple append-only logging. Future: implement log rotation at 10MB.

## File Structure

```
kiro-deck-builder/
├── app/
│   ├── page.js                 # Main game page
│   ├── layout.js               # Root layout with Kiro theme
│   └── globals.css             # Global styles with Kiro colors
├── components/
│   ├── Card.jsx                # Reusable card component
│   ├── GameBoard.jsx           # Main game layout
│   ├── Hand.jsx                # Player hand display
│   ├── PlayArea.jsx            # Played cards area
│   ├── Store.jsx               # Buy phase store
│   ├── Challenge.jsx           # Active challenge display
│   ├── ResourceDisplay.jsx     # Resources/score/turn display
│   └── PhaseButton.jsx         # Phase transition button
├── lib/
│   ├── gameReducer.js          # Main game state reducer
│   ├── cardEffects.js          # Card effect application
│   ├── deckManager.js          # Deck operations
│   ├── challengeLogic.js       # Challenge completion logic
│   ├── turnController.js       # Turn flow management
│   └── gameData.js             # Card and challenge definitions
├── context/
│   └── GameContext.jsx         # Game state context provider
├── __tests__/
│   ├── unit/
│   │   ├── components/         # Component tests
│   │   └── lib/                # Logic tests
│   └── properties/
│       ├── gameFlow.test.js
│       ├── cardEffects.test.js
│       ├── challenges.test.js
│       ├── store.test.js
│       └── ui.test.js
├── public/
│   └── kiro-logo.png           # Kiro logo asset
├── logs/
│   └── game.log                # Server logs
├── middleware.js               # Logging middleware
├── vitest.config.js            # Test configuration
└── package.json
```

## Implementation Notes

### Performance Considerations

- Use React.memo for Card components to prevent unnecessary re-renders
- Memoize expensive calculations (deck shuffling, card filtering)
- Use CSS transforms for animations (GPU-accelerated)
- Lazy load Framer Motion only when needed

### Accessibility

- All interactive elements have proper ARIA labels
- Keyboard navigation support (Tab, Enter, Space)
- High contrast ratios for text (WCAG AA compliant)
- Focus indicators on all interactive elements

### Browser Compatibility

- Target: Modern browsers (Chrome, Firefox, Safari, Edge)
- No IE11 support needed
- Use CSS Grid and Flexbox (widely supported)

### Future Enhancements (Post-MVP)

- Multiplayer support
- Save/load game state
- More card types and effects
- Achievements system
- Sound effects and music
- Card animations and particle effects
- Difficulty levels
- Leaderboard
- Mobile responsive design
