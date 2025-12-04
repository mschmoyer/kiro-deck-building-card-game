'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Card from './Card';
import Hand from './Hand';
import PlayArea from './PlayArea';
import Store from './Store';
import Challenge from './Challenge';
import PhaseButton from './PhaseButton';
import GameOver from './GameOver';

/**
 * GameBoard Component
 * Main game layout using CSS Grid
 * Layout: 3 columns (200px, 1fr, 300px), 2 rows
 * 
 * Grid Structure:
 * ┌──────────┬────────────────────────────┬──────────────────────┐
 * │  Deck    │      Play Area / Store     │   Active Challenge   │
 * │  (top)   │                            │                      │
 * ├──────────┼────────────────────────────┼──────────────────────┤
 * │ Discard  │         Hand               │    Phase Button      │
 * │ (bottom) │                            │                      │
 * └──────────┴────────────────────────────┴──────────────────────┘
 */
export default function GameBoard() {
  const { gameState, playCard, completeChallenge, purchaseCard, endPlayPhase, endBuyPhase, restartGame } = useGame();

  const {
    playerDeck,
    discardPile,
    hand,
    playedCards,
    activeChallenge,
    store,
    currentTasks,
    currentSpecs,
    phase,
    gameOver,
    score,
    turn
  } = gameState;

  // Handlers
  const handleCardClick = (cardId) => {
    if (phase === 'play') {
      playCard(cardId);
    }
  };

  const handlePurchase = (cardId) => {
    if (phase === 'buy') {
      purchaseCard(cardId);
    }
  };

  const handlePhaseTransition = () => {
    if (phase === 'play') {
      endPlayPhase();
    } else {
      endBuyPhase();
    }
  };

  return (
    <>
      {/* Show GameOver overlay when game ends */}
      {gameOver && (
        <GameOver
          score={score}
          turn={turn}
          onRestart={restartGame}
        />
      )}

      <div 
        className="w-full h-full p-6"
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr 300px',
          gridTemplateRows: 'auto auto',
          gap: '24px',
          minHeight: '600px'
        }}
      >
      {/* TOP LEFT: Deck */}
      <div className="flex flex-col items-center justify-start">
        <DeckPile cards={playerDeck} label="Deck" />
      </div>

      {/* TOP CENTER: Play Area or Store (phase-dependent) */}
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'play' ? (
            <motion.div
              key="play-area"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
            >
              <PlayArea playedCards={playedCards} phase={phase} />
            </motion.div>
          ) : (
            <motion.div
              key="store"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 150 }}
            >
              <Store 
                storeCards={store}
                onPurchase={handlePurchase}
                currentTasks={currentTasks}
                disabled={phase !== 'buy'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* TOP RIGHT: Active Challenge */}
      <div className="flex items-center justify-center">
        <Challenge
          challenge={activeChallenge}
          currentTasks={currentTasks}
          currentSpecs={currentSpecs}
          onComplete={completeChallenge}
        />
      </div>

      {/* BOTTOM LEFT: Discard Pile */}
      <div className="flex flex-col items-center justify-start">
        <DeckPile cards={discardPile} label="Discard" />
      </div>

      {/* BOTTOM CENTER: Hand */}
      <div className="flex items-center justify-center">
        <Hand
          cards={hand}
          onCardClick={handleCardClick}
          disabled={phase !== 'play'}
        />
      </div>

      {/* BOTTOM RIGHT: Phase Button */}
      <div className="flex items-center justify-center">
        <PhaseButton
          phase={phase}
          onClick={handlePhaseTransition}
          disabled={false}
        />
      </div>
    </div>
    </>
  );
}

/**
 * DeckPile Component
 * Displays a card pile with stacked effect and card count
 * 
 * @param {Object} props
 * @param {Array} props.cards - Array of cards in the pile
 * @param {string} props.label - Label for the pile (e.g., "Deck" or "Discard")
 */
function DeckPile({ cards = [], label }) {
  const cardCount = cards.length;

  return (
    <motion.div 
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Label */}
      <motion.div 
        className="text-white font-bold text-sm uppercase tracking-wide"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {label}
      </motion.div>

      {/* Card Pile with Stacked Effect */}
      <div className="relative" style={{ width: '200px', height: '280px' }}>
        {cardCount === 0 ? (
          // Empty pile placeholder
          <motion.div 
            className="w-full h-full border-2 border-dashed border-prey-700 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-prey-600 text-sm">Empty</span>
          </motion.div>
        ) : (
          // Stacked cards effect
          <>
            {/* Bottom card (offset for depth) */}
            {cardCount > 2 && (
              <motion.div 
                className="absolute bg-prey-800 rounded-lg border-2 border-prey-700"
                style={{
                  width: '200px',
                  height: '280px',
                  top: '8px',
                  left: '8px',
                  zIndex: 1
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
            
            {/* Middle card (offset for depth) */}
            {cardCount > 1 && (
              <motion.div 
                className="absolute bg-prey-800 rounded-lg border-2 border-prey-700"
                style={{
                  width: '200px',
                  height: '280px',
                  top: '4px',
                  left: '4px',
                  zIndex: 2
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
              />
            )}
            
            {/* Top card (actual card back) */}
            <motion.div 
              className="absolute"
              style={{
                width: '200px',
                height: '280px',
                top: '0',
                left: '0',
                zIndex: 3
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                card={cards[0]}
                showFront={false}
                disabled={true}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Card Count */}
      <motion.div 
        className="bg-prey-800 px-4 py-2 rounded-full border border-prey-700"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={cardCount}
            className="text-white font-bold text-lg"
            initial={{ scale: 1.5, color: '#fbbf24' }}
            animate={{ scale: 1, color: '#ffffff' }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {cardCount}
          </motion.span>
        </AnimatePresence>
        <span className="text-prey-400 text-sm ml-1">
          {cardCount === 1 ? 'card' : 'cards'}
        </span>
      </motion.div>
    </motion.div>
  );
}
