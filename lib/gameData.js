// Game Data Definitions
// Emoji conventions: ⚡ Tasks, 📋 Specs, ⭐ Points, 🃏 Card Draw

// Starter Deck Cards (12 cards: 6 Basic Code, 6 Quick Spec)
export const starterDeck = [
  {
    id: 'basic-code-1',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'basic-code-2',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'basic-code-3',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'basic-code-4',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'basic-code-5',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'basic-code-6',
    name: 'Basic Code',
    type: 'action',
    cost: 0,
    taskPoints: 1,
    specs: 0,
    cardDraw: 0,
    description: '+1 ⚡ Task'
  },
  {
    id: 'quick-spec-1',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  },
  {
    id: 'quick-spec-2',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  },
  {
    id: 'quick-spec-3',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  },
  {
    id: 'quick-spec-4',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  },
  {
    id: 'quick-spec-5',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  },
  {
    id: 'quick-spec-6',
    name: 'Quick Spec',
    type: 'action',
    cost: 0,
    taskPoints: 0,
    specs: 1,
    cardDraw: 0,
    description: '+1 📋 Spec'
  }
];

// Store Card Pool (7 cards with varying costs and effects)
export const storeCardPool = [
  {
    id: 'focused-coding',
    name: 'Focused Coding',
    type: 'action',
    cost: 3,
    taskPoints: 3,
    specs: 0,
    cardDraw: 0,
    description: '+3 ⚡ Tasks'
  },
  {
    id: 'pair-programming',
    name: 'Pair Programming',
    type: 'action',
    cost: 4,
    taskPoints: 2,
    specs: 0,
    cardDraw: 1,
    description: '+2 ⚡ Tasks, +1 🃏 Card'
  },
  {
    id: 'write-spec',
    name: 'Write Spec',
    type: 'action',
    cost: 3,
    taskPoints: 0,
    specs: 2,
    cardDraw: 0,
    description: '+2 📋 Specs'
  },
  {
    id: 'code-review',
    name: 'Code Review',
    type: 'action',
    cost: 2,
    taskPoints: 1,
    specs: 1,
    cardDraw: 0,
    description: '+1 ⚡ Task, +1 📋 Spec'
  },
  {
    id: 'refactor',
    name: 'Refactor',
    type: 'action',
    cost: 5,
    taskPoints: 4,
    specs: 1,
    cardDraw: 0,
    description: '+4 ⚡ Tasks, +1 📋 Spec'
  },
  {
    id: 'ai-assist',
    name: 'AI Assist',
    type: 'action',
    cost: 4,
    taskPoints: 1,
    specs: 0,
    cardDraw: 2,
    description: '+1 ⚡ Task, +2 🃏 Cards'
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    type: 'action',
    cost: 6,
    taskPoints: 5,
    specs: 0,
    cardDraw: 1,
    description: '+5 ⚡ Tasks, +1 🃏 Card'
  }
];

// Challenge Deck (10 cards: bugs and features with varying difficulty)
export const challengeDeck = [
  // Easy bugs (3-4 tasks, 0 specs, 1 point)
  {
    id: 'typo-bug',
    name: 'Typo in Variable',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 3,
    requiredSpecs: 0,
    pointValue: 1,
    flavorText: '🐛 A simple typo is breaking the build'
  },
  {
    id: 'missing-import',
    name: 'Missing Import',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 4,
    requiredSpecs: 0,
    pointValue: 1,
    flavorText: '🐛 Module not found error'
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
    flavorText: '🐛 Undefined is not a function'
  },
  {
    id: 'race-condition',
    name: 'Race Condition',
    type: 'challenge',
    challengeType: 'bug',
    requiredTasks: 6,
    requiredSpecs: 1,
    pointValue: 2,
    flavorText: '🐛 Intermittent test failures'
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
    flavorText: '✨ Create a reusable button'
  },
  {
    id: 'form-validation',
    name: 'Form Validation',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 5,
    requiredSpecs: 1,
    pointValue: 1,
    flavorText: '✨ Validate user input'
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
    flavorText: '✨ Connect to external service'
  },
  {
    id: 'user-auth',
    name: 'User Authentication',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 8,
    requiredSpecs: 2,
    pointValue: 2,
    flavorText: '✨ Implement login system'
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
    flavorText: '🐛 App is running slow'
  },
  {
    id: 'complex-feature',
    name: 'Real-time Collaboration',
    type: 'challenge',
    challengeType: 'feature',
    requiredTasks: 10,
    requiredSpecs: 3,
    pointValue: 3,
    flavorText: '✨ Build WebSocket system'
  }
];
