// Turn Flow Controller
// Handles phase transitions and turn management

import { drawCards } from './deckManager';

/**
 * Ends the play phase and transitions to buy phase
 * @param {Object} gameState - Current game state
 * @returns {Object} - Updated game state
 */
export function endPlayPhase(gameState) {
  return {
    ...gameState,
    phase: 'buy'
  };
}

/**
 * Ends the buy phase and starts a new turn
 * - Moves played cards to discard pile
 * - Resets resources to 0
 * - Increments turn counter
 * - Draws new hand
 * - Transitions to play phase
 * @param {Object} gameState - Current game state
 * @returns {Object} - Updated game state
 */
export function endBuyPhase(gameState) {
  // Move played cards to discard
  const newDiscardPile = [...gameState.discardPile, ...gameState.playedCards];
  
  // Reset resources to 0
  const newTasks = 0;
  const newSpecs = 0;
  
  // Increment turn counter
  const newTurn = gameState.turn + 1;
  
  // Check if game is over
  const gameOver = newTurn > gameState.maxTurns;
  
  // Draw new hand for next turn (if game is not over)
  let newHand = [];
  let newPlayerDeck = gameState.playerDeck;
  let updatedDiscardPile = newDiscardPile;
  
  if (!gameOver) {
    const drawResult = drawCards(
      newPlayerDeck,
      updatedDiscardPile,
      gameState.handSize
    );
    
    newHand = drawResult.drawnCards;
    newPlayerDeck = drawResult.newDeck;
    updatedDiscardPile = drawResult.newDiscard;
  }
  
  return {
    ...gameState,
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
