'use client';

import { motion } from 'framer-motion';
import Card from './Card';

/**
 * Hand Component
 * Displays the player's hand of cards in a horizontal layout
 * 
 * @param {Object} props
 * @param {Array} props.cards - Array of card objects in the player's hand
 * @param {Function} props.onCardClick - Handler for when a card is clicked
 * @param {boolean} props.disabled - Whether cards are disabled (e.g., during buy phase)
 */
export default function Hand({ cards = [], onCardClick, disabled = false }) {
  if (!cards || cards.length === 0) {
    return (
      <motion.div 
        className="flex items-center justify-center h-[280px] text-prey-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        No cards in hand
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.instanceId}
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
          <Card
            card={card}
            showFront={true}
            onClick={disabled ? undefined : () => onCardClick(card.instanceId)}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </div>
  );
}
