'use client';

import { motion } from 'framer-motion';

/**
 * PhaseButton Component
 * Displays a button to transition between play and buy phases
 * 
 * @param {Object} props
 * @param {string} props.phase - Current phase ('play' or 'buy')
 * @param {function} props.onClick - Handler for phase transition
 * @param {boolean} props.disabled - Whether the button is disabled
 */
export default function PhaseButton({ phase, onClick, disabled = false }) {
  const buttonText = phase === 'play' ? 'End Play Phase' : 'End Buy Phase';
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold text-white
        ${disabled 
          ? 'bg-gray-600 cursor-not-allowed opacity-50' 
          : 'bg-purple-500 shadow-lg'
        }
      `}
      style={{
        backgroundColor: disabled ? undefined : '#790ECB'
      }}
      whileHover={!disabled ? { 
        scale: 1.05,
        backgroundColor: '#8f1ee6',
        boxShadow: '0 10px 30px rgba(121, 14, 203, 0.4)'
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.95 
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
    >
      <motion.span
        key={buttonText}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {buttonText}
      </motion.span>
    </motion.button>
  );
}
