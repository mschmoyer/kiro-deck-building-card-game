'use client';

import Store from './Store';
import { storeCardPool } from '@/lib/gameData';

/**
 * Simple test component to verify Store functionality
 */
export default function StoreTest() {
  // Create test store cards with instance IDs
  const testStoreCards = storeCardPool.slice(0, 5).map((card, idx) => ({
    ...card,
    instanceId: `${card.id}-test-${idx}`
  }));

  const handlePurchase = (cardId) => {
    console.log('Purchased card:', cardId);
  };

  return (
    <div className="p-8 bg-black-900 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-500 mb-8">Store Component Test</h1>
      
      <div className="space-y-8">
        {/* Test 1: Store with sufficient tasks */}
        <div>
          <h2 className="text-xl text-white mb-4">Test 1: Can afford some cards (5 tasks)</h2>
          <Store 
            storeCards={testStoreCards}
            onPurchase={handlePurchase}
            currentTasks={5}
            disabled={false}
          />
        </div>

        {/* Test 2: Store with no tasks */}
        <div>
          <h2 className="text-xl text-white mb-4">Test 2: Cannot afford any cards (0 tasks)</h2>
          <Store 
            storeCards={testStoreCards}
            onPurchase={handlePurchase}
            currentTasks={0}
            disabled={false}
          />
        </div>

        {/* Test 3: Store disabled */}
        <div>
          <h2 className="text-xl text-white mb-4">Test 3: Store disabled (during play phase)</h2>
          <Store 
            storeCards={testStoreCards}
            onPurchase={handlePurchase}
            currentTasks={10}
            disabled={true}
          />
        </div>

        {/* Test 4: Store with only 3 cards */}
        <div>
          <h2 className="text-xl text-white mb-4">Test 4: Store with only 3 cards (shows empty slots)</h2>
          <Store 
            storeCards={testStoreCards.slice(0, 3)}
            onPurchase={handlePurchase}
            currentTasks={10}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}
