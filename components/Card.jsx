'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Card Component
 * Displays a game card with front and back faces
 * Dimensions: 200px × 280px
 * 
 * @param {Object} props
 * @param {Object} props.card - Card data object
 * @param {boolean} props.showFront - Whether to show front or back of card
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether card is disabled
 * @param {string} props.className - Additional CSS classes
 */
export default function Card({ 
  card, 
  showFront = true, 
  onClick, 
  disabled = false,
  className = '' 
}) {
  const isClickable = onClick && !disabled;

  return (
    <motion.div
      className={`relative cursor-${isClickable ? 'pointer' : 'default'} ${className}`}
      style={{ width: '200px', height: '280px' }}
      whileHover={isClickable ? { y: -8, scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      onClick={isClickable ? onClick : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div 
        className={`w-full h-full rounded-lg shadow-lg overflow-hidden ${
          disabled ? 'opacity-50 grayscale' : ''
        }`}
      >
        {showFront ? (
          <CardFront card={card} disabled={disabled} />
        ) : (
          <CardBack />
        )}
      </div>
    </motion.div>
  );
}

/**
 * Card Front Face
 * Displays card details including name, cost, and effects
 */
function CardFront({ card, disabled }) {
  const isChallenge = card.type === 'challenge';
  const isBug = card.challengeType === 'bug';
  const isFeature = card.challengeType === 'feature';

  return (
    <div className="w-full h-full bg-gradient-to-br from-prey-750 to-prey-900 border-2 border-prey-700 flex flex-col p-4 relative">
      {/* Cost Badge (top-right corner for action cards) */}
      {!isChallenge && card.cost !== undefined && (
        <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
          ⚡{card.cost}
        </div>
      )}

      {/* Challenge Type Icon (top-left for challenges) */}
      {isChallenge && (
        <div className="absolute top-2 left-2 text-2xl">
          {isBug ? '🐛' : isFeature ? '✨' : ''}
        </div>
      )}

      {/* Card Name */}
      <div className="text-center mt-2 mb-4">
        <h3 className="text-white font-bold text-lg leading-tight">
          {card.name}
        </h3>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-3">
        {isChallenge ? (
          <>
            {/* Challenge Requirements */}
            <div className="text-center space-y-2">
              {card.requiredTasks > 0 && (
                <div className="text-white text-base">
                  ⚡ {card.requiredTasks} Tasks
                </div>
              )}
              {card.requiredSpecs > 0 && (
                <div className="text-white text-base">
                  📋 {card.requiredSpecs} Specs
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full border-t border-prey-700"></div>

            {/* Challenge Reward */}
            <div className="text-purple-300 text-xl font-bold">
              ⭐ {card.pointValue} Points
            </div>

            {/* Flavor Text */}
            {card.flavorText && (
              <div className="text-prey-400 text-xs text-center italic mt-2 px-2">
                {card.flavorText}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Action Card Effects */}
            <div className="text-center space-y-2">
              {card.taskPoints > 0 && (
                <div className="text-purple-300 text-xl font-bold">
                  +{card.taskPoints} ⚡
                </div>
              )}
              {card.specs > 0 && (
                <div className="text-purple-300 text-xl font-bold">
                  +{card.specs} 📋
                </div>
              )}
              {card.cardDraw > 0 && (
                <div className="text-purple-300 text-xl font-bold">
                  +{card.cardDraw} 🃏
                </div>
              )}
            </div>

            {/* Description */}
            {card.description && (
              <div className="text-prey-300 text-sm text-center mt-2 px-2">
                {card.description}
              </div>
            )}
          </>
        )}
      </div>

      {/* Card Type Footer */}
      <div className="text-center text-prey-500 text-xs uppercase tracking-wide mt-2">
        {isChallenge ? (isBug ? 'Bug' : 'Feature') : 'Action'}
      </div>
    </div>
  );
}

/**
 * Card Back Face
 * Displays Kiro-branded card back with logo and purple gradient
 */
function CardBack() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-purple-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Kiro Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-24 h-24 relative mb-4">
          <Image
            src="/assets/kiro-logo.png"
            alt="Kiro Logo"
            width={96}
            height={96}
            className="object-contain drop-shadow-lg"
          />
        </div>
        <div className="text-white font-bold text-xl tracking-wider drop-shadow-md">
          KIRO
        </div>
        <div className="text-white text-xs tracking-widest mt-1 opacity-80">
          DECK BUILDER
        </div>
      </div>

      {/* Border Accent */}
      <div className="absolute inset-0 border-4 border-white opacity-20 rounded-lg"></div>
    </div>
  );
}
