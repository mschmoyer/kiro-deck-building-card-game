'use client';

import { GameProvider } from '@/context/GameContext';
import ResourceDisplay from './ResourceDisplay';
import GameBoard from './GameBoard';
import { useGame } from '@/context/GameContext';
import { useEffect } from 'react';

function GameBoardTestInner() {
  const { startGame } = useGame();

  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <div className="min-h-screen bg-black-900 p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Resource Display at Top */}
        <ResourceDisplay />
        
        {/* Game Board */}
        <GameBoard />
      </div>
    </div>
  );
}

export default function GameBoardTest() {
  return (
    <GameProvider>
      <GameBoardTestInner />
    </GameProvider>
  );
}
