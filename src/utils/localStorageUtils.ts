export interface GameScore {
  name: string;
  complexity: number;
  score: number;
}

const LOCAL_STORAGE_KEY = 'gameScores';

export const saveGameScore = (gameScore: GameScore) => {
  try {
    const storedScores = getStoredScores();
    storedScores.push(gameScore);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedScores));
  } catch (error) {
    console.error('Error saving game score to localStorage:', error);
  }
};

export const getStoredScores = (): GameScore[] => {
  try {
    const storedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedScores) {
      const parsedScores = JSON.parse(storedScores);

      if (Array.isArray(parsedScores)) {
        return parsedScores;
      }
    }
  } catch (error) {
    console.error('Error parsing scores from localStorage:', error);
  }
  return [];
};
