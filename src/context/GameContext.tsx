import React, { createContext, useState, ReactNode } from 'react';
import { initGame, getTokenChunk } from '../services/api';

interface GameContextProps {
  playerId: string | null;
  token: string | null;
  initializeGame: (name: string, complexity: number) => Promise<void>;
  caveData: Array<[number, number]>;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
  playerName: string;
  playerComplexity: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [caveData, setCaveData] = useState<Array<[number, number]>>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerComplexity, setPlayerComplexity] = useState<number>(5);

  const initializeGame = async (name: string, complexity: number) => {
    try {
      setPlayerName(name);
      setPlayerComplexity(complexity);
      const id = await initGame(name, complexity);
      setPlayerId(id);

      const tokenChunks = await Promise.all(
        Array.from({ length: 4 }, (_, i) => getTokenChunk(id, i + 1)),
      );

      const fullToken = tokenChunks.join('');
      setToken(fullToken);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      throw error;
    }
  };

  return (
    <GameContext.Provider
      value={{
        playerId,
        token,
        initializeGame,
        caveData,
        setCaveData,
        playerName,
        playerComplexity,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
