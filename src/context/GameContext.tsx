import React, { useState, createContext, ReactNode } from 'react';
import { useCaveWebSocket } from 'hooks/useCaveWebSocket';
import { initializeGame } from './helpers/initializeGame';

interface GameContextProps {
  playerId: string | null;
  token: string | null;
  caveData: Array<[number, number]>;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
  initializeGame: (name: string, complexity: number) => Promise<void>;
  playerName: string;
  playerComplexity: number;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined,
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [caveData, setCaveData] = useState<Array<[number, number]>>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerComplexity, setPlayerComplexity] = useState<number>(0);
  const baseWsUrl = import.meta.env.VITE_API_BASE_WS_URL;

  const handleInitializeGame = async (name: string, complexity: number) => {
    try {
      setPlayerName(name);
      setPlayerComplexity(complexity);
      const { id, token } = await initializeGame(name, complexity);
      setPlayerId(id);
      setToken(token);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      throw error;
    }
  };

  useCaveWebSocket({ playerId, token, baseWsUrl, setCaveData });

  return (
    <GameContext.Provider
      value={{
        playerId,
        token,
        caveData,
        setCaveData,
        initializeGame: handleInitializeGame,
        playerName,
        playerComplexity,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
