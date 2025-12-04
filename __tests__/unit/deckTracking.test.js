/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { gameReducer, ACTIONS, initialGameState } from '../../lib/gameReducer';

describe('Deck Tracking Mechanics', () => {
  let gameState;

  beforeEach(() => {
    // Initialize game
    gameState = gameReducer(initialGameState, { type: ACTIONS.START_GAME });
  });

  it('should add purchased cards to discard pile, not deck', () => {
    // Transition to buy phase
    gameState = gameReducer(gameState, { type: ACTIONS.END_PLAY_PHASE });
    
    // Give player enough tasks to purchase
    gameState = { ...gameState, currentTasks: 10 };
    
    const initialDeckSize = gameState.playerDeck.length;
    const initialDiscardSize = gameState.discardPile.length;
    const storeCard = gameState.store[0];
    
    // Purchase a card
    gameState = gameReducer(gameState, {
      type: ACTIONS.PURCHASE_CARD,
      payload: { cardId: storeCard.instanceId }
    });
    
    // Verify deck size unchanged
    expect(gameState.playerDeck.length).toBe(initialDeckSize);
    
    // Verify discard pile increased by 1
    expect(gameState.discardPile.length).toBe(initialDiscardSize + 1);
    
    // Verify the purchased card is in discard pile
    expect(gameState.discardPile).toContainEqual(storeCard);
  });

  it('should trigger automatic reshuffle when deck is empty during draw', () => {
    // Empty the deck and put cards in discard
    const cardsInDiscard = gameState.playerDeck.slice(0, 3);
    gameState = {
      ...gameState,
      playerDeck: [],
      discardPile: cardsInDiscard,
      hand: []
    };
    
    // Draw cards (should trigger reshuffle)
    gameState = gameReducer(gameState, {
      type: ACTIONS.DRAW_CARDS,
      payload: { count: 2 }
    });
    
    // Verify cards were drawn
    expect(gameState.hand.length).toBe(2);
    
    // Verify discard was shuffled into deck
    expect(gameState.discardPile.length).toBe(0);
    expect(gameState.playerDeck.length).toBe(1); // 3 cards - 2 drawn = 1 remaining
  });

  it('should shuffle discard into deck immediately when needed during card play', () => {
    // Set up state: empty deck, cards in discard, play a card with draw effect
    const cardWithDraw = {
      id: 'test-draw',
      instanceId: 'test-draw-1',
      name: 'Test Draw',
      type: 'action',
      cardDraw: 2,
      taskPoints: 1
    };
    
    const cardsInDiscard = gameState.playerDeck.slice(0, 3);
    gameState = {
      ...gameState,
      playerDeck: [],
      discardPile: cardsInDiscard,
      hand: [cardWithDraw]
    };
    
    // Play the card with draw effect
    gameState = gameReducer(gameState, {
      type: ACTIONS.PLAY_CARD,
      payload: { cardId: cardWithDraw.instanceId }
    });
    
    // Verify reshuffle happened and cards were drawn
    expect(gameState.hand.length).toBe(2); // Drew 2 cards
    expect(gameState.discardPile.length).toBe(0); // Discard was shuffled
    expect(gameState.playerDeck.length).toBe(1); // 3 - 2 = 1 remaining
  });

  it('should move played cards to discard at end of buy phase', () => {
    // Play some cards
    const card1 = gameState.hand[0];
    const card2 = gameState.hand[1];
    
    gameState = gameReducer(gameState, {
      type: ACTIONS.PLAY_CARD,
      payload: { cardId: card1.instanceId }
    });
    
    gameState = gameReducer(gameState, {
      type: ACTIONS.PLAY_CARD,
      payload: { cardId: card2.instanceId }
    });
    
    expect(gameState.playedCards.length).toBe(2);
    
    const initialDiscardSize = gameState.discardPile.length;
    
    // End play phase
    gameState = gameReducer(gameState, { type: ACTIONS.END_PLAY_PHASE });
    
    // End buy phase
    gameState = gameReducer(gameState, { type: ACTIONS.END_BUY_PHASE });
    
    // Verify played cards moved to discard
    expect(gameState.playedCards.length).toBe(0);
    expect(gameState.discardPile.length).toBe(initialDiscardSize + 2);
    expect(gameState.discardPile).toContainEqual(card1);
    expect(gameState.discardPile).toContainEqual(card2);
  });

  it('should handle complete deck cycle: purchase → discard → reshuffle → draw', () => {
    // Start with a small deck for easier testing
    const smallDeck = gameState.playerDeck.slice(0, 2);
    gameState = {
      ...gameState,
      playerDeck: smallDeck,
      discardPile: [],
      hand: []
    };
    
    // 1. Purchase a card (goes to discard)
    gameState = gameReducer(gameState, { type: ACTIONS.END_PLAY_PHASE });
    gameState = { ...gameState, currentTasks: 10 };
    const purchasedCard = gameState.store[0];
    
    gameState = gameReducer(gameState, {
      type: ACTIONS.PURCHASE_CARD,
      payload: { cardId: purchasedCard.instanceId }
    });
    
    expect(gameState.discardPile).toContainEqual(purchasedCard);
    
    // 2. Empty the deck by drawing all cards
    gameState = gameReducer(gameState, {
      type: ACTIONS.DRAW_CARDS,
      payload: { count: 2 }
    });
    
    expect(gameState.playerDeck.length).toBe(0);
    expect(gameState.hand.length).toBe(2);
    
    // 3. Try to draw more cards (should trigger reshuffle)
    gameState = gameReducer(gameState, {
      type: ACTIONS.DRAW_CARDS,
      payload: { count: 1 }
    });
    
    // Verify the purchased card was reshuffled and could be drawn
    expect(gameState.hand.length).toBe(3);
    expect(gameState.discardPile.length).toBe(0);
  });

  it('should handle drawing when both deck and discard are empty', () => {
    // Empty both deck and discard
    gameState = {
      ...gameState,
      playerDeck: [],
      discardPile: [],
      hand: []
    };
    
    // Try to draw cards
    gameState = gameReducer(gameState, {
      type: ACTIONS.DRAW_CARDS,
      payload: { count: 5 }
    });
    
    // Should handle gracefully without crashing
    expect(gameState.hand.length).toBe(0);
    expect(gameState.playerDeck.length).toBe(0);
    expect(gameState.discardPile.length).toBe(0);
  });

  it('should correctly update deck and discard counts throughout game', () => {
    // Verify deck and discard counts update correctly as cards move through the system
    
    const initialDeckCount = gameState.playerDeck.length;
    const initialHandCount = gameState.hand.length;
    
    // Play a card
    const card = gameState.hand[0];
    gameState = gameReducer(gameState, {
      type: ACTIONS.PLAY_CARD,
      payload: { cardId: card.instanceId }
    });
    
    // Verify hand decreased by 1 and played cards increased by 1
    expect(gameState.hand.length).toBe(initialHandCount - 1);
    expect(gameState.playedCards.length).toBe(1);
    
    // End play phase
    gameState = gameReducer(gameState, { type: ACTIONS.END_PLAY_PHASE });
    
    // Played cards should still be in played area
    expect(gameState.playedCards.length).toBe(1);
    
    // End buy phase - played cards should move to discard
    const discardBeforeBuyEnd = gameState.discardPile.length;
    gameState = gameReducer(gameState, { type: ACTIONS.END_BUY_PHASE });
    
    // Verify played cards moved to discard
    expect(gameState.playedCards.length).toBe(0);
    expect(gameState.discardPile.length).toBe(discardBeforeBuyEnd + 1);
    
    // Verify new hand was drawn
    expect(gameState.hand.length).toBe(5);
    
    // Verify deck count decreased appropriately
    expect(gameState.playerDeck.length).toBe(initialDeckCount - 5);
  });

  it('should reshuffle discard during new turn draw when deck is empty', () => {
    // Set up: empty deck, exactly 5 cards in discard (will all be drawn)
    const cardsInDiscard = gameState.playerDeck.slice(0, 5);
    gameState = {
      ...gameState,
      playerDeck: [],
      discardPile: cardsInDiscard,
      hand: [],
      playedCards: [],
      phase: 'buy' // Must be in buy phase to end it
    };
    
    // End buy phase (should draw new hand and trigger reshuffle)
    gameState = gameReducer(gameState, { type: ACTIONS.END_BUY_PHASE });
    
    // Verify new hand was drawn (should draw all 5 cards)
    expect(gameState.hand.length).toBe(5);
    
    // Verify discard was shuffled into deck and then emptied
    expect(gameState.discardPile.length).toBe(0);
    
    // Verify deck is now empty (all 5 cards were drawn)
    expect(gameState.playerDeck.length).toBe(0);
  });
});
