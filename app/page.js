'use client';

import { useEffect } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import ResourceDisplay from '@/components/ResourceDisplay';
import GameBoard from '@/components/GameBoard';

/**
 * GameContent Component
 * Inner component that has access to GameContext
 * Initializes the game on mount
 */
function GameContent() {
  const { startGame } = useGame();

  // Initialize game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-black-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Resource Display at top */}
        <ResourceDisplay />
        
        {/* Game Board in center */}
        <GameBoard />
      </div>
    </div>
  );
}

/**
 * Home Component
 * Main game page wrapped with GameContext provider
 */
export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
