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

      {/* Played Cards Grid */}
      <div className="flex-1 flex items-center justify-center">
        {playedCards.length === 0 ? (
          <motion.div 
            className="text-prey-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            No cards played yet
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
      </div>
    </motion.div>
  );
}
