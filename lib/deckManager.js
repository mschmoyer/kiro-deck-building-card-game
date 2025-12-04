// Deck Management Functions
// Handles drawing cards, shuffling, and reshuffle logic

/**
 * Shuffles an array of cards using Fisher-Yates algorithm
 * @param {Array} cards - Array of card objects to shuffle
 * @returns {Array} - New shuffled array
 */
export function shuffleDeck(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draws cards from the deck, reshuffling discard pile if needed
 * @param {Array} deck - Current player deck
 * @param {Array} discardPile - Current discard pile
 * @param {number} count - Number of cards to draw
 * @returns {Object} - { drawnCards, newDeck, newDiscard }
 */
export function drawCards(deck, discardPile, count) {
  let currentDeck = [...deck];
  let currentDiscard = [...discardPile];
  const drawnCards = [];
  
  for (let i = 0; i < count; i++) {
    // Check if deck is empty and we need to reshuffle
    if (currentDeck.length === 0 && currentDiscard.length > 0) {
      currentDeck = shuffleDeck(currentDiscard);
      currentDiscard = [];
    }
    
    // Draw a card if available
    if (currentDeck.length > 0) {
      drawnCards.push(currentDeck[0]);
      currentDeck = currentDeck.slice(1);
    }
    // If both deck and discard are empty, we can't draw more cards
    // This handles the edge case gracefully by returning what we could draw
  }
  
  return {
    drawnCards,
    newDeck: currentDeck,
    newDiscard: currentDiscard
  };
}
