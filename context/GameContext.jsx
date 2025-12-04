'use client';

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { gameReducer, initialGameState, ACTIONS } from '../lib/gameReducer';

// Create the context
const GameContext = createContext(null);

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// GameProvider component
export function GameProvider({ children }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // Memoize helper functions to prevent infinite loops
  const startGame = useCallback(() => dispatch({ type: ACTIONS.START_GAME }), []);
  const drawCards = useCallback((count) => dispatch({ type: ACTIONS.DRAW_CARDS, payload: { count } }), []);
  const playCard = useCallback((cardId) => dispatch({ type: ACTIONS.PLAY_CARD, payload: { cardId } }), []);
  const completeChallenge = useCallback(() => dispatch({ type: ACTIONS.COMPLETE_CHALLENGE }), []);
  const purchaseCard = useCallback((cardId) => dispatch({ type: ACTIONS.PURCHASE_CARD, payload: { cardId } }), []);
  const endPlayPhase = useCallback(() => dispatch({ type: ACTIONS.END_PLAY_PHASE }), []);
  const endBuyPhase = useCallback(() => dispatch({ type: ACTIONS.END_BUY_PHASE }), []);
  const restartGame = useCallback(() => dispatch({ type: ACTIONS.RESTART_GAME }), []);

  const value = useMemo(() => ({
    gameState,
    dispatch,
    startGame,
    drawCards,
    playCard,
    completeChallenge,
    purchaseCard,
    endPlayPhase,
    endBuyPhase,
    restartGame
  }), [gameState, startGame, drawCards, playCard, completeChallenge, purchaseCard, endPlayPhase, endBuyPhase, restartGame]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export { ACTIONS };
