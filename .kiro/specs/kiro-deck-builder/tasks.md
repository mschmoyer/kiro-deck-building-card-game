# Implementation Plan

- [x] 1. Set up Next.js project structure and dependencies
  - Initialize Next.js 14 project with App Router
  - Install dependencies: shadcn/ui, Tailwind CSS, Framer Motion, Vitest, fast-check
  - Configure Tailwind with Kiro color palette (purple-500: #790ECB)
  - Set up project file structure (components/, lib/, context/, __tests__/)
  - Create logs/ directory for server logging
  - _Requirements: 10.1_

- [ ]* 1.1 Write unit test for project setup
  - Verify Tailwind config includes Kiro colors
  - Verify directory structure exists
  - _Requirements: 10.1_

- [x] 2. Create Card component with front and back
  - Build Card.jsx component (200×280px dimensions)
  - Implement front face with card details
  - Implement back face with Kiro logo and purple gradient
  - Add hover effects and animations
  - Support disabled state styling
  - _Requirements: 1.4, 1.5, 10.2, 10.3, 10.4_

- [ ]* 2.1 Write unit test for Card component
  - Test card renders with correct dimensions
  - Test front/back face switching
  - Test hover states
  - _Requirements: 1.4, 1.5_

- [ ]* 2.2 Write property test for card dimensions
  - **Property 11: Card dimensions are consistent**
  - **Validates: Requirements 1.4**

- [x] 3. Define game data (cards and challenges)
  - Create lib/gameData.js with card definitions
  - Define 10 starter deck cards (8 Basic Code, 2 Quick Spec)
  - Define 7 store card pool cards with varying costs and effects
  - Define 10 challenge cards (bugs and features) with varying difficulty
  - Use emoji conventions: ⚡ Tasks, 📋 Specs, ⭐ Points, 🃏 Card Draw
  - _Requirements: 8.1, 8.2, 8.3, 9.1_

- [ ]* 3.1 Write unit test for game data
  - Verify starter deck has 10 cards
  - Verify store pool has variety of costs
  - Verify challenge deck has bugs and features
  - _Requirements: 8.1, 8.2, 9.1_

- [x] 4. Implement game state management
  - Create context/GameContext.jsx with Context Provider
  - Build lib/gameReducer.js with game state reducer
  - Define initial game state structure
  - Implement action types: START_GAME, DRAW_CARDS, PLAY_CARD, COMPLETE_CHALLENGE, PURCHASE_CARD, END_PLAY_PHASE, END_BUY_PHASE, RESTART_GAME
  - _Requirements: 1.1, 6.1_

- [ ]* 4.1 Write unit test for game reducer
  - Test initial state is correct
  - Test each action type updates state correctly
  - _Requirements: 6.1_

- [x] 5. Implement deck management logic
  - Create lib/deckManager.js
  - Implement drawCards() function with reshuffle logic
  - Implement shuffleDeck() function
  - Handle edge case: empty deck and discard
  - _Requirements: 2.1, 2.2, 2.4_

- [ ]* 5.1 Write unit test for deck management
  - Test drawing cards from deck
  - Test reshuffling when deck is empty
  - Test drawing with both deck and discard empty
  - _Requirements: 2.1, 2.2, 2.4_

- [ ]* 5.2 Write property test for turn initialization
  - **Property 1: Turn initialization draws correct hand size**
  - **Validates: Requirements 2.1, 2.3**

- [x] 6. Implement card effects engine
  - Create lib/cardEffects.js
  - Implement applyCardEffect() function
  - Handle task point generation
  - Handle spec generation
  - Handle card draw effects
  - _Requirements: 3.2, 3.3, 8.5_

- [ ]* 6.1 Write unit test for card effects
  - Test task point generation
  - Test spec generation
  - Test card draw effects
  - _Requirements: 3.2, 3.3, 8.5_

- [ ]* 6.2 Write property test for resource accumulation
  - **Property 2: Playing cards accumulates resources correctly**
  - **Validates: Requirements 3.2, 3.3**

- [ ]* 6.3 Write property test for card draw
  - **Property 3: Card draw effects work correctly**
  - **Validates: Requirements 8.5**

- [x] 7. Implement challenge completion logic
  - Create lib/challengeLogic.js
  - Implement canCompleteChallenge() function
  - Implement completeChallenge() function with resource deduction and scoring
  - Handle spec requirement validation
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ]* 7.1 Write unit test for challenge logic
  - Test challenge completion with sufficient resources
  - Test challenge blocked with insufficient specs
  - Test score awarded correctly
  - _Requirements: 4.2, 4.3, 4.5_

- [ ]* 7.2 Write property test for challenge completion
  - **Property 4: Challenge completion deducts resources and awards points**
  - **Validates: Requirements 4.2, 4.3**

- [ ]* 7.3 Write property test for spec requirements
  - **Property 10: Insufficient resources prevent challenge completion**
  - **Validates: Requirements 4.5**

- [x] 8. Implement turn flow controller
  - Create lib/turnController.js
  - Implement endPlayPhase() function
  - Implement endBuyPhase() function with cleanup, turn increment, and new hand draw
  - Reset resources to 0 at turn end
  - _Requirements: 3.5, 5.5, 6.2_

- [ ]* 8.1 Write unit test for turn flow
  - Test play phase to buy phase transition
  - Test buy phase cleanup and turn increment
  - Test resource reset
  - _Requirements: 3.5, 5.5, 6.2_

- [ ]* 8.2 Write property test for phase transitions
  - **Property 8: Phase transition cleans up correctly**
  - **Validates: Requirements 5.5, 6.2**

- [ ]* 8.3 Write property test for turn counter
  - **Property 12: Turn counter increments correctly**
  - **Validates: Requirements 6.2**

- [x] 9. Create ResourceDisplay component
  - Build components/ResourceDisplay.jsx
  - Display ⚡ Tasks, 📋 Specs, ⭐ Score with current values
  - Display Turn: {current}/{max}
  - Display current phase indicator
  - Ensure reactive updates when resources change
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 9.1 Write unit test for ResourceDisplay
  - Test all resources are displayed
  - Test turn counter displays correctly
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ]* 9.2 Write property test for resource display updates
  - **Property 9: Resource display updates reactively**
  - **Validates: Requirements 7.5**

- [x] 10. Create Challenge component
  - Build components/Challenge.jsx
  - Display challenge card with name, type (🐛 Bug or ✨ Feature)
  - Show ⚡ Tasks required, 📋 Specs required, ⭐ Points reward
  - Show flavor text
  - Enable complete button when resources are sufficient
  - Add click handler to complete challenge
  - _Requirements: 4.1, 9.2_

- [ ]* 10.1 Write unit test for Challenge component
  - Test challenge displays requirements
  - Test complete button enabled/disabled based on resources
  - _Requirements: 4.1, 9.2_

- [ ]* 10.2 Write property test for challenge replacement
  - **Property 5: Challenge replacement maintains one active challenge**
  - **Validates: Requirements 4.4, 9.4**

- [x] 11. Create Hand component
  - Build components/Hand.jsx
  - Display player's hand cards in horizontal layout
  - Implement hover to elevate card effect
  - Add click handler to play cards
  - Disable during buy phase
  - _Requirements: 3.1_

- [ ]* 11.1 Write unit test for Hand component
  - Test hand displays cards
  - Test cards are clickable during play phase
  - Test cards are disabled during buy phase
  - _Requirements: 3.1_

- [x] 12. Create PlayArea component
  - Build components/PlayArea.jsx
  - Display played cards in horizontal grid
  - Show section title "Played Cards"
  - Match height with Hand and Store (280px)
  - _Requirements: 1.2, 3.1_

- [ ]* 12.1 Write unit test for PlayArea component
  - Test played cards are displayed
  - Test visibility during play phase
  - _Requirements: 1.2_

- [x] 13. Create Store component
  - Build components/Store.jsx
  - Display 5 store cards with costs (⚡ in corner badge)
  - Highlight affordable cards
  - Add click handler to purchase cards
  - Replace purchased card with new card from pool
  - Match height with Hand and PlayArea (280px)
  - _Requirements: 5.1, 5.2, 5.3_

- [ ]* 13.1 Write unit test for Store component
  - Test store displays 5 cards
  - Test purchase button enabled/disabled based on resources
  - _Requirements: 5.1_

- [ ]* 13.2 Write property test for card purchase
  - **Property 6: Card purchase deducts cost and adds to discard**
  - **Validates: Requirements 5.2**

- [ ]* 13.3 Write property test for store replenishment
  - **Property 7: Store replenishment maintains store size**
  - **Validates: Requirements 5.3**

- [x] 14. Create PhaseButton component
  - Build components/PhaseButton.jsx
  - Display "End Play Phase" or "End Buy Phase" based on current phase
  - Style with Kiro purple (#790ECB)
  - Add click handler to transition phases
  - Position to right of hand
  - _Requirements: 3.4, 5.4_

- [ ]* 14.1 Write unit test for PhaseButton
  - Test button text changes based on phase
  - Test click triggers phase transition
  - _Requirements: 3.4, 5.4_

- [x] 15. Create GameBoard component with grid layout
  - Build components/GameBoard.jsx
  - Implement CSS Grid layout: 3 columns (200px, 1fr, 300px), 2 rows
  - Position Deck (top-left), PlayArea/Store (top-center), Challenge (top-right)
  - Position Discard (bottom-left), Hand (bottom-center), PhaseButton (bottom-right)
  - Show deck and discard as card piles with stacked effect
  - Display card counts for deck and discard
  - _Requirements: 1.1, 1.2, 1.3_

- [ ]* 15.1 Write unit test for GameBoard
  - Test all zones are rendered
  - Test layout switches between play and buy phase
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 16. Create main game page
  - Build app/page.js
  - Wrap with GameContext provider
  - Render ResourceDisplay at top
  - Render GameBoard in center
  - Initialize game on mount with START_GAME action
  - _Requirements: 1.1_

- [ ]* 16.1 Write unit test for game page
  - Test game initializes on mount
  - Test all components are rendered
  - _Requirements: 1.1_

- [x] 17. Implement game end logic
  - Add game end check when turn reaches 20
  - Display final score and win/loss message
  - Show restart button
  - Handle RESTART_GAME action
  - _Requirements: 6.3, 6.4, 6.5_

- [ ]* 17.1 Write unit test for game end
  - Test game ends at turn 20
  - Test final score is displayed
  - Test restart button works
  - _Requirements: 6.3, 6.4, 6.5_

- [x] 18. Add animations and polish
  - Add Framer Motion animations for card movements
  - Implement smooth transitions between phases
  - Add hover effects on all interactive elements
  - Ensure 60 FPS performance
  - _Requirements: 10.3, 10.4_

- [ ]* 18.1 Write unit test for animations
  - Test animations are applied to cards
  - Test hover effects work
  - _Requirements: 10.3, 10.4_

- [x] 19. Set up server logging
  - Create middleware.js for request logging
  - Log all requests to logs/game.log with timestamp
  - Format: "YYYY-MM-DDTHH:mm:ss.sssZ - METHOD URL"
  - Handle log file creation and appending
  - _Requirements: Server logging requirement_

- [ ]* 19.1 Write unit test for logging middleware
  - Test log file is created
  - Test requests are logged with correct format
  - _Requirements: Server logging requirement_

- [-] 20. Final integration and testing
  - Run all unit tests and ensure they pass
  - Run all property-based tests and ensure they pass
  - Test complete game flow manually
  - Verify all 10 requirements are met
  - Fix any remaining bugs

- [ ]* 20.1 Run full test suite
  - Execute: npm test
  - Verify all tests pass
  - Check test coverage
