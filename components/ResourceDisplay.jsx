'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';

export default function ResourceDisplay() {
  const { gameState } = useGame();
  
  const {
    currentTasks,
    currentSpecs,
    score,
    turn,
    maxTurns,
    phase
  } = gameState;

  return (
    <motion.div 
      className="w-full bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-800"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between gap-6 flex-wrap">
        {/* Game Title with Logo - Left Side */}
        <div className="flex items-center gap-3">
          <img 
            src="/assets/kiro-logo.png" 
            alt="Kiro Logo" 
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-2xl font-bold text-white">
            Kiro <span className="text-purple-500">Deck Builder</span>
          </h1>
        </div>

        {/* Resources Section - Center */}
        <div className="flex items-center gap-6">
          {/* Tasks */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-white font-semibold">Tasks:</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentTasks}
                className="text-purple-300 text-xl font-bold"
                initial={{ scale: 1.5, color: '#fbbf24' }}
                animate={{ scale: 1, color: '#d8b4fe' }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentTasks}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Specs */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-2xl">📋</span>
            <span className="text-white font-semibold">Specs:</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={currentSpecs}
                className="text-purple-300 text-xl font-bold"
                initial={{ scale: 1.5, color: '#fbbf24' }}
                animate={{ scale: 1, color: '#d8b4fe' }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentSpecs}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Score */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-2xl">⭐</span>
            <span className="text-white font-semibold">Score:</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={score}
                className="text-purple-300 text-xl font-bold"
                initial={{ scale: 1.5, color: '#fbbf24', y: -10 }}
                animate={{ scale: 1, color: '#d8b4fe', y: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4, type: 'spring' }}
              >
                {score}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Turn and Phase Section */}
        <div className="flex items-center gap-6">
          {/* Turn Counter */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-white font-semibold">Turn:</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={turn}
                className="text-purple-300 text-xl font-bold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                {turn}/{maxTurns}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Phase Indicator */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-white font-semibold">Phase:</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={phase}
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  phase === 'play' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-prey-700 text-purple-300'
                }`}
                initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotate: 10, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring' }}
              >
                {phase === 'play' ? 'Play' : 'Buy'}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
