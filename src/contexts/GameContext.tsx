import useGameInit from '@hooks/useGameInit';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface GameContextProps {
  playerId: string | null;
  token: string | null;
  caveData: Array<[number, number]>;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
  initializeGame: (name: string, complexity: number) => Promise<void>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const { playerId, token, initializeGame } = useGameInit();
  const [caveData, setCaveData] = useState<Array<[number, number]>>([]);
  const baseWsUrl = import.meta.env.VITE_API_BASE_WS_URL;

  useEffect(() => {
    if (!playerId || !token) return;

    const ws = new WebSocket(baseWsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
      ws.send(`player:${playerId}-${token}`);
    };

    ws.onmessage = (event) => {
      const message = event.data;

      if (message === 'finished') {
        ws.close();
      } else {
        const [leftWall, rightWall] = message.split(',').map(Number);
        setCaveData((prevData) => [...prevData, [leftWall, rightWall]]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
  }, [playerId, token]);

  return (
    <GameContext.Provider
      value={{
        playerId,
        token,
        caveData,
        setCaveData,
        initializeGame,
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
