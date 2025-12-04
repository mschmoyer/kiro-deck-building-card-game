'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

/**
 * Store Component
 * Displays 5 purchasable cards during the buy phase
 * 
 * @param {Object} props
 * @param {Array} props.storeCards - Array of 5 cards available for purchase
 * @param {Function} props.onPurchase - Handler for purchasing a card
 * @param {number} props.currentTasks - Player's current task points
 * @param {boolean} props.disabled - Whether purchases are disabled
 */
export default function Store({ 
  storeCards = [], 
  onPurchase, 
  currentTasks = 0,
  disabled = false 
}) {
  // Ensure we always have exactly 5 slots
  const displayCards = [...storeCards];
  while (displayCards.length < 5) {
    displayCards.push(null);
  }

  return (
    <motion.div 
      className="w-full" 
      style={{ height: '280px' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-white text-xl font-bold">Store</h2>
        <p className="text-prey-400 text-sm">Purchase cards to improve your deck</p>
      </motion.div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        <AnimatePresence mode="popLayout">
          {displayCards.slice(0, 5).map((card, index) => {
          if (!card) {
            // Empty slot placeholder
            return (
              <motion.div 
                key={`empty-${index}`}
                className="flex-shrink-0 w-[200px] h-[280px] border-2 border-dashed border-prey-700 rounded-lg flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="text-prey-600 text-sm">Empty</span>
              </motion.div>
            );
          }

          const canAfford = currentTasks >= (card.cost || 0);
          const isDisabled = disabled || !canAfford;

          return (
            <motion.div 
              key={card.instanceId} 
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.08,
                type: 'spring',
                stiffness: 150,
                damping: 15
              }}
              layout
            >
              {/* Affordability indicator */}
              {canAfford && !disabled && (
                <motion.div 
                  className="absolute -top-2 -right-2 z-10 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: 0.3 + index * 0.08
                  }}
                >
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    ✓
                  </motion.span>
                </motion.div>
              )}
              
              {/* Highlight affordable cards */}
              <motion.div 
                className={`
                  ${canAfford && !disabled ? 'ring-4 ring-green-500 ring-opacity-50 rounded-lg' : ''}
                `}
                animate={canAfford && !disabled ? {
                  boxShadow: [
                    '0 0 0 0 rgba(34, 197, 94, 0)',
                    '0 0 20px 5px rgba(34, 197, 94, 0.3)',
                    '0 0 0 0 rgba(34, 197, 94, 0)'
                  ]
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Card
                  card={card}
                  showFront={true}
                  onClick={() => !isDisabled && onPurchase(card.instanceId)}
                  disabled={isDisabled}
                />
              </motion.div>

              {/* Cost display below card */}
              <motion.div 
                className="text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.08 }}
              >
                <span className={`
                  text-sm font-bold
                  ${canAfford ? 'text-green-400' : 'text-prey-500'}
                `}>
                  Cost: ⚡{card.cost || 0}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
