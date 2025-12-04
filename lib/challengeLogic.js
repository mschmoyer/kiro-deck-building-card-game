// Challenge Completion Logic
// Handles validation and completion of bug and feature challenges

/**
 * Checks if a challenge can be completed with current resources
 * @param {Object} challenge - The challenge card to check
 * @param {number} tasks - Current task points available
 * @param {number} specs - Current spec points available
 * @returns {boolean} - True if challenge can be completed
 */
export function canCompleteChallenge(challenge, tasks, specs) {
  if (!challenge) {
    return false;
  }
  
  const requiredTasks = challenge.requiredTasks || 0;
  const requiredSpecs = challenge.requiredSpecs || 0;
  
  const hasEnoughTasks = tasks >= requiredTasks;
  const hasEnoughSpecs = specs >= requiredSpecs;
  
  return hasEnoughTasks && hasEnoughSpecs;
}

/**
 * Completes a challenge, deducting resources and awarding points
 * @param {Object} challenge - The challenge to complete
 * @param {Object} gameState - Current game state
 * @returns {Object} - Updated game state with challenge completed
 */
export function completeChallenge(challenge, gameState) {
  if (!challenge) {
    return gameState;
  }
  
  // Validate that player has sufficient resources
  if (!canCompleteChallenge(challenge, gameState.currentTasks, gameState.currentSpecs)) {
    return gameState;
  }
  
  // Deduct required resources
  const newTasks = gameState.currentTasks - (challenge.requiredTasks || 0);
  const newSpecs = gameState.currentSpecs - (challenge.requiredSpecs || 0);
  
  // Award points
  const newScore = gameState.score + (challenge.pointValue || 0);
  
  // Add to completed challenges
  const newCompletedChallenges = [...gameState.completedChallenges, challenge];
  
  // Draw new challenge from deck
  let newChallengeDeck = [...gameState.challengeDeck];
  let newActiveChallenge = null;
  
  if (newChallengeDeck.length > 0) {
    // Draw from challenge deck
    newActiveChallenge = newChallengeDeck[0];
    newChallengeDeck = newChallengeDeck.slice(1);
  } else if (newCompletedChallenges.length > 0) {
    // If challenge deck is empty, reshuffle completed challenges
    const shuffled = shuffleArray(newCompletedChallenges);
    newActiveChallenge = shuffled[0];
    newChallengeDeck = shuffled.slice(1);
  }
  
  return {
    ...gameState,
    currentTasks: newTasks,
    currentSpecs: newSpecs,
    score: newScore,
    activeChallenge: newActiveChallenge,
    challengeDeck: newChallengeDeck,
    completedChallenges: newCompletedChallenges
  };
}

/**
 * Helper function to shuffle an array
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
