import { CHUNKS_PER_PLAYER } from 'constants';
import { initGame, getTokenChunk } from 'services/api';

export const initializeGame = async (name: string, complexity: number) => {
  try {
    const id = await initGame(name, complexity);

    const tokenChunks = await Promise.all(
      Array.from({ length: CHUNKS_PER_PLAYER }, (_, i) =>
        getTokenChunk(id, i + 1),
      ),
    );

    const fullToken = tokenChunks.join('');

    return { id, token: fullToken };
  } catch (error) {
    console.error('Failed to initialize game:', error);
    throw error;
  }
};
