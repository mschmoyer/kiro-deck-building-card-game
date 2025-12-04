'use client';

import { motion } from 'framer-motion';
import Card from './Card';

/**
 * Store Component
 * Displays 5 purchasable cards during the buy phase
 * 
 * @param {Object} props
 * @param {Array} props.storeCards - Array of card objects available in the store
 * @param {Function} props.onPurchase - Handler for when a card is purchased
 * @param {number} props.currentTasks - Current task points available
 * @param {boolean} props.disabled - Whether purchases are disabled
 */
export default function Store({ 
  storeCards = [], 
  onPurchase, 
  currentTasks = 0, 
  disabled = false 
}) {
  if (!storeCards || storeCards.length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center h-[280px] text-prey-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        No cards available in store
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {storeCards.map((card, index) => {
        const canAfford = currentTasks >= (card.cost || 0);
        const isClickable = !disabled && canAfford;

        return (
          <motion.div
            key={card.instanceId}
            className="relative"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
          >
            {/* Affordable Highlight */}
            {canAfford && !disabled && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-purple-500 opacity-20 blur-sm"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            <Card
              card={card}
              showFront={true}
              onClick={isClickable ? () => onPurchase(card.instanceId) : undefined}
              disabled={!canAfford || disabled}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
