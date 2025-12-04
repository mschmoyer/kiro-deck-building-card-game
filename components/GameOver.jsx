'use client';

import { motion } from 'framer-motion';

/**
 * GameOver Component
 * Displays final score, win/loss message, and restart button
 * 
 * @param {Object} props
 * @param {number} props.score - Final score
 * @param {number} props.turn - Final turn number
 * @param {Function} props.onRestart - Callback to restart the game
 */
export default function GameOver({ score, turn, onRestart }) {
  // Determine win/loss based on score
  // Win condition: 10+ points (as per user context)
  const hasWon = score >= 10;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-prey-750 border-2 border-purple-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
        initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
      >
        {/* Game Over Title */}
        <motion.h1 
          className="text-4xl font-bold text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="text-white">Game Over!</span>
        </motion.h1>

        {/* Win/Loss Message */}
        <motion.div 
          className="text-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {hasWon ? (
            <div>
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.5,
                  ease: 'easeInOut'
                }}
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-purple-400 mb-2">
                Victory!
              </h2>
              <p className="text-prey-300 text-lg">
                You've successfully completed enough challenges to win!
              </p>
            </div>
          ) : (
            <div>
              <motion.div 
                className="text-6xl mb-4"
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 1,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                💻
              </motion.div>
              <h2 className="text-3xl font-bold text-prey-300 mb-2">
                Time's Up!
              </h2>
              <p className="text-prey-300 text-lg">
                Keep practicing to improve your score!
              </p>
            </div>
          )}
        </motion.div>

        {/* Final Score Display */}
        <motion.div 
          className="bg-black-900 rounded-lg p-6 mb-6 border border-prey-700"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-prey-300 text-lg">Final Score:</span>
            <motion.span 
              className="text-white text-3xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.6,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}
            >
              ⭐ {score}
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-prey-300 text-lg">Turns Played:</span>
            <motion.span 
              className="text-white text-2xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.7,
                type: 'spring',
                stiffness: 200,
                damping: 10
              }}
            >
              {turn - 1} / 20
            </motion.span>
          </div>
        </motion.div>

        {/* Restart Button */}
        <motion.button
          onClick={onRestart}
          className="w-full bg-purple-500 text-white font-bold py-4 px-6 rounded-lg text-xl"
          style={{ backgroundColor: '#790ECB' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: '#8f1ee6',
            boxShadow: '0 10px 30px rgba(121, 14, 203, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Play Again
        </motion.button>

        {/* Additional Stats (optional flavor) */}
        <motion.div 
          className="mt-4 text-center text-prey-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          {hasWon ? (
            <p>Can you beat your score?</p>
          ) : (
            <p>Try purchasing better cards to improve your deck!</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
