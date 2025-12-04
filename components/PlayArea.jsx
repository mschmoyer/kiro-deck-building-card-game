'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

/**
 * PlayArea Component
 * Displays cards that have been played during the play phase
 * Shown in horizontal grid layout
 * Height matches Hand and Store (280px)
 * 
 * @param {Object} props
 * @param {Array} props.playedCards - Array of card objects that have been played
 * @param {string} props.phase - Current game phase ('play' or 'buy')
 */
export default function PlayArea({ playedCards = [], phase }) {
  // Only show during play phase
  if (phase !== 'play') {
    return null;
  }

  return (
    <motion.div 
      className="flex flex-col h-[280px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Section Title */}
      <motion.div 
        className="text-white text-lg font-bold mb-3 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Played Cards
      </motion.div>

      {/* Played Cards Grid with Background Container */}
      <motion.div 
        className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900/40 to-gray-800/40 rounded-xl border border-gray-700/30 backdrop-blur-sm p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        {playedCards.length === 0 ? (
          <motion.div 
            className="text-prey-300 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="text-lg font-semibold mb-3 text-white">How to Play</div>
            <div className="space-y-2 text-sm">
              <p>🎯 <span className="font-medium">Goal:</span> Score 10+ points in 20 turns</p>
              <p>🃏 <span className="font-medium">Play Phase:</span> Click cards to play them and gain resources</p>
              <p>✨ <span className="font-medium">Complete challenges</span> to earn ⭐ points</p>
              <p>🛒 <span className="font-medium">Buy Phase:</span> Purchase better cards to improve your deck</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <AnimatePresence mode="popLayout">
              {playedCards.map((card, index) => (
                <motion.div
                  key={card.instanceId}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  layout
                >
                  <Card
                    card={card}
                    showFront={true}
                    disabled={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
