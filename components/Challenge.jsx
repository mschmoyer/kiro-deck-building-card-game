'use client';

import { motion } from 'framer-motion';
import Card from './Card';

/**
 * Challenge Component
 * Displays the active bug or feature challenge that the player can complete
 * 
 * @param {Object} props
 * @param {Object} props.challenge - Challenge card data
 * @param {number} props.currentTasks - Player's current task points
 * @param {number} props.currentSpecs - Player's current spec points
 * @param {Function} props.onComplete - Handler for completing the challenge
 */
export default function Challenge({ 
  challenge, 
  currentTasks, 
  currentSpecs, 
  onComplete 
}) {
  if (!challenge) {
    return (
      <div className="w-[200px] h-[280px] flex items-center justify-center">
        <div className="text-prey-500 text-center text-sm">
          No active challenge
        </div>
      </div>
    );
  }

  // Check if player has sufficient resources to complete the challenge
  const hasEnoughTasks = currentTasks >= (challenge.requiredTasks || 0);
  const hasEnoughSpecs = currentSpecs >= (challenge.requiredSpecs || 0);
  const canComplete = hasEnoughTasks && hasEnoughSpecs;

  const isBug = challenge.challengeType === 'bug';
  const typeEmoji = isBug ? '🐛' : '✨';

  return (
    <motion.div 
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ 
        duration: 0.5,
        type: 'spring',
        stiffness: 150,
        damping: 20
      }}
    >
      {/* Challenge Card */}
      <motion.div
        animate={canComplete ? {
          boxShadow: [
            '0 10px 30px rgba(121, 14, 203, 0.3)',
            '0 15px 40px rgba(121, 14, 203, 0.5)',
            '0 10px 30px rgba(121, 14, 203, 0.3)'
          ]
        } : {}}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Card 
          card={challenge}
          showFront={true}
          disabled={false}
          className="shadow-xl"
        />
      </motion.div>

      {/* Complete Button */}
      <motion.button
        onClick={canComplete ? onComplete : undefined}
        disabled={!canComplete}
        className={`
          px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide
          shadow-lg
          ${canComplete 
            ? 'bg-purple-500 text-white cursor-pointer' 
            : 'bg-prey-700 text-prey-500 cursor-not-allowed opacity-50'
          }
        `}
        style={{
          backgroundColor: canComplete ? '#790ECB' : undefined
        }}
        whileHover={canComplete ? { 
          scale: 1.08,
          backgroundColor: '#8f1ee6',
          boxShadow: '0 10px 30px rgba(121, 14, 203, 0.5)'
        } : {}}
        whileTap={canComplete ? { 
          scale: 0.92,
          rotate: [0, -2, 2, 0]
        } : {}}
        animate={canComplete ? {
          y: [0, -3, 0]
        } : {}}
        transition={canComplete ? {
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        } : {}}
      >
        {canComplete ? '✓ Complete Challenge' : '✗ Insufficient Resources'}
      </motion.button>

      {/* Resource Status */}
      <motion.div 
        className="text-center space-y-1 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className={`${hasEnoughTasks ? 'text-green-400' : 'text-red-400'}`}
          animate={hasEnoughTasks ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ⚡ {currentTasks} / {challenge.requiredTasks || 0} Tasks
        </motion.div>
        {(challenge.requiredSpecs || 0) > 0 && (
          <motion.div 
            className={`${hasEnoughSpecs ? 'text-green-400' : 'text-red-400'}`}
            animate={hasEnoughSpecs ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            📋 {currentSpecs} / {challenge.requiredSpecs} Specs
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
