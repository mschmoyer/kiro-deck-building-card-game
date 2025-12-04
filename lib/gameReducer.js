import { starterDeck, storeCardPool, challengeDeck } from './gameData';

// Initial game state
export const initialGameState = {
  // Decks and cards
  playerDeck: [],
  discardPile: [],
  hand: [],
  playedCards: [],
  challengeDeck: [],
  completedChallenges: [],
  activeChallenge: null,
  store: [],
  storePool: [],
  
  // Resources
  currentTasks: 0,
  currentSpecs: 0,
  score: 0,
  
  // Game flow
  turn: 1,
  phase: 'play',
  gameOver: false,
  
  // Constants
  maxTurns: 20,
  handSize: 5,
  storeSize: 5
};

// Action types
export const ACTIONS = {
  START_GAME: 'START_GAME',
  DRAW_CARDS: 'DRAW_CARDS',
  PLAY_CARD: 'PLAY_CARD',
  COMPLETE_CHALLENGE: 'COMPLETE_CHALLENGE',
  PURCHASE_CARD: 'PURCHASE_CARD',
  END_PLAY_PHASE: 'END_PLAY_PHASE',
  END_BUY_PHASE: 'END_BUY_PHASE',
  RESTART_GAME: 'RESTART_GAME'
};

// Helper function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Game reducer
export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_GAME: {
      // Initialize the game with starter deck and challenge
      const shuffledDeck = shuffleArray(starterDeck.map((card, idx) => ({
        ...card,
        instanceId: `${card.id}-${idx}`
      })));
      
      const shuffledChallenges = shuffleArray(challengeDeck.map((card, idx) => ({
        ...card,
        instanceId: `${card.id}-${idx}`
      })));
      
      const shuffledStorePool = shuffleArray(storeCardPool.map((card, idx) => ({
        ...card,
        instanceId: `${card.id}-${idx}`
      })));
      
      // Draw initial hand
      const hand = shuffledDeck.slice(0, 5);
      const remainingDeck = shuffledDeck.slice(5);
      
      // Draw first challenge
      const activeChallenge = shuffledChallenges[0];
      const remainingChallenges = shuffledChallenges.slice(1);
      
      // Set up initial store
      const store = shuffledStorePool.slice(0, 5);
      const remainingStorePool = shuffledStorePool.slice(5);
      
      return {
        ...initialGameState,
        playerDeck: remainingDeck,
        hand,
        challengeDeck: remainingChallenges,
        activeChallenge,
        store,
        storePool: remainingStorePool,
        turn: 1,
        phase: 'play'
      };
    }

    case ACTIONS.DRAW_CARDS: {
      const { count = 1 } = action.payload || {};
      let { playerDeck, discardPile, hand } = state;
      const drawnCards = [];
      
      for (let i = 0; i < count; i++) {
        // Check if we need to reshuffle
        if (playerDeck.length === 0 && discardPile.length > 0) {
          playerDeck = shuffleArray(discardPile);
          discardPile = [];
        }
        
        // Draw a card if available
        if (playerDeck.length > 0) {
          drawnCards.push(playerDeck[0]);
          playerDeck = playerDeck.slice(1);
        }
      }
      
      return {
        ...state,
        playerDeck,
        discardPile,
        hand: [...hand, ...drawnCards]
      };
    }

    case ACTIONS.PLAY_CARD: {
      const { cardId } = action.payload;
      const card = state.hand.find(c => c.instanceId === cardId);
      
      if (!card) return state;
      
      // Remove card from hand and add to played cards
      const newHand = state.hand.filter(c => c.instanceId !== cardId);
      const newPlayedCards = [...state.playedCards, card];
      
      // Apply card effects
      let newTasks = state.currentTasks + (card.taskPoints || 0);
      let newSpecs = state.currentSpecs + (card.specs || 0);
      let newPlayerDeck = state.playerDeck;
      let newDiscardPile = state.discardPile;
      let updatedHand = newHand;
      
      // Handle card draw effect
      if (card.cardDraw && card.cardDraw > 0) {
        for (let i = 0; i < card.cardDraw; i++) {
          // Check if we need to reshuffle
          if (newPlayerDeck.length === 0 && newDiscardPile.length > 0) {
            newPlayerDeck = shuffleArray(newDiscardPile);
            newDiscardPile = [];
          }
          
          // Draw a card if available
          if (newPlayerDeck.length > 0) {
            updatedHand = [...updatedHand, newPlayerDeck[0]];
            newPlayerDeck = newPlayerDeck.slice(1);
          }
        }
      }
      
      return {
        ...state,
        hand: updatedHand,
        playedCards: newPlayedCards,
        currentTasks: newTasks,
        currentSpecs: newSpecs,
        playerDeck: newPlayerDeck,
        discardPile: newDiscardPile
      };
    }

    case ACTIONS.COMPLETE_CHALLENGE: {
      const activeChallenge = state.activeChallenge;
      
      if (!activeChallenge) return state;
      
      // Check if player has enough resources
      const hasEnoughTasks = state.currentTasks >= (activeChallenge.requiredTasks || 0);
      const hasEnoughSpecs = state.currentSpecs >= (activeChallenge.requiredSpecs || 0);
      
      if (!hasEnoughTasks || !hasEnoughSpecs) return state;
      
      // Deduct resources
      const newTasks = state.currentTasks - (activeChallenge.requiredTasks || 0);
      const newSpecs = state.currentSpecs - (activeChallenge.requiredSpecs || 0);
      
      // Award points
      const newScore = state.score + (activeChallenge.pointValue || 0);
      
      // Add to completed challenges
      const newCompletedChallenges = [...state.completedChallenges, activeChallenge];
      
      // Draw new challenge
      let newChallengeDeck = state.challengeDeck;
      let newActiveChallenge = null;
      let finalCompletedChallenges = newCompletedChallenges;
      
      if (newChallengeDeck.length > 0) {
        newActiveChallenge = newChallengeDeck[0];
        newChallengeDeck = newChallengeDeck.slice(1);
      } else if (newCompletedChallenges.length > 0) {
        // Reshuffle completed challenges if deck is empty
        const reshuffled = shuffleArray(newCompletedChallenges);
        newActiveChallenge = reshuffled[0];
        newChallengeDeck = reshuffled.slice(1);
        finalCompletedChallenges = []; // Clear completed challenges after reshuffling
      }
      
      return {
        ...state,
        currentTasks: newTasks,
        currentSpecs: newSpecs,
        score: newScore,
        activeChallenge: newActiveChallenge,
        challengeDeck: newChallengeDeck,
        completedChallenges: finalCompletedChallenges
      };
    }

    case ACTIONS.PURCHASE_CARD: {
      const { cardId } = action.payload;
      const card = state.store.find(c => c.instanceId === cardId);
      
      if (!card) return state;
      
      // Check if player has enough tasks
      if (state.currentTasks < (card.cost || 0)) return state;
      
      // Deduct cost
      const newTasks = state.currentTasks - (card.cost || 0);
      
      // Add card to discard pile
      const newDiscardPile = [...state.discardPile, card];
      
      // Remove card from store
      const newStore = state.store.filter(c => c.instanceId !== cardId);
      
      // Replace with new card from pool
      let newStorePool = state.storePool;
      if (newStorePool.length > 0) {
        newStore.push(newStorePool[0]);
        newStorePool = newStorePool.slice(1);
      }
      
      return {
        ...state,
        currentTasks: newTasks,
        discardPile: newDiscardPile,
        store: newStore,
        storePool: newStorePool
      };
    }

    case ACTIONS.END_PLAY_PHASE: {
      return {
        ...state,
        phase: 'buy'
      };
    }

    case ACTIONS.END_BUY_PHASE: {
      // Move played cards to discard
      const newDiscardPile = [...state.discardPile, ...state.playedCards];
      
      // Reset resources
      const newTasks = 0;
      const newSpecs = 0;
      
      // Increment turn
      const newTurn = state.turn + 1;
      
      // Check if game is over
      const gameOver = newTurn > state.maxTurns;
      
      // Draw new hand
      let newPlayerDeck = state.playerDeck;
      let updatedDiscardPile = newDiscardPile;
      const newHand = [];
      
      if (!gameOver) {
        for (let i = 0; i < state.handSize; i++) {
          // Check if we need to reshuffle
          if (newPlayerDeck.length === 0 && updatedDiscardPile.length > 0) {
            newPlayerDeck = shuffleArray(updatedDiscardPile);
            updatedDiscardPile = [];
          }
          
          // Draw a card if available
          if (newPlayerDeck.length > 0) {
            newHand.push(newPlayerDeck[0]);
            newPlayerDeck = newPlayerDeck.slice(1);
          }
        }
      }
      
      return {
        ...state,
        phase: 'play',
        playedCards: [],
        currentTasks: newTasks,
        currentSpecs: newSpecs,
        turn: newTurn,
        gameOver,
        hand: newHand,
        playerDeck: newPlayerDeck,
        discardPile: updatedDiscardPile
      };
    }

    case ACTIONS.RESTART_GAME: {
      return gameReducer(initialGameState, { type: ACTIONS.START_GAME });
    }

    default:
      return state;
  }
}
