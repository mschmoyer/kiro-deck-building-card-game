// Card Effects Engine
// Handles applying card effects to game state

import { drawCards } from './deckManager';

/**
 * Applies the effects of a played card to the game state
 * Handles: task point generation, spec generation, card draw effects
 * 
 * @param {Object} card - The card being played
 * @param {Object} gameState - Current game state
 * @returns {Object} - Updated game state with card effects applied
 */
export function applyCardEffect(card, gameState) {
  if (!card) return gameState;
  
  let updatedState = { ...gameState };
  
  // Handle task point generation (Requirement 3.2)
  if (card.taskPoints && card.taskPoints > 0) {
    updatedState.currentTasks = (updatedState.currentTasks || 0) + card.taskPoints;
  }
  
  // Handle spec generation (Requirement 3.3)
  if (card.specs && card.specs > 0) {
    updatedState.currentSpecs = (updatedState.currentSpecs || 0) + card.specs;
  }
  
  // Handle card draw effects (Requirement 8.5)
  if (card.cardDraw && card.cardDraw > 0) {
    const { drawnCards, newDeck, newDiscard } = drawCards(
      updatedState.playerDeck,
      updatedState.discardPile,
      card.cardDraw
    );
    
    updatedState.hand = [...updatedState.hand, ...drawnCards];
    updatedState.playerDeck = newDeck;
    updatedState.discardPile = newDiscard;
  }
  
  return updatedState;
}
