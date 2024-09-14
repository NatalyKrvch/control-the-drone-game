import { initGame, getTokenChunk } from '@services/api';
import { useState } from 'react';

interface UseGameInitResult {
  initializeGame: (name: string, complexity: number) => Promise<void>;
  playerId: string | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

const useGameInit = (): UseGameInitResult => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initializeGame = async (name: string, complexity: number) => {
    setLoading(true);
    setError(null);

    try {
      const id = await initGame(name, complexity);
      console.log('Player ID:', id);
      setPlayerId(id);

      const tokenChunks = await Promise.all(
        Array.from({ length: 4 }, (_, i) => getTokenChunk(id, i + 1)),
      );
      console.log('Token Chunks:', tokenChunks);

      const fullToken = tokenChunks.join('');
      console.log('Full Token:', fullToken);
      setToken(fullToken);
    } catch (err) {
      setError('Failed to initialize game.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { initializeGame, playerId, token, error, loading };
};

export default useGameInit;
