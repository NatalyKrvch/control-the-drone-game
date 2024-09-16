// context/GameContext.tsx
import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { initGame, getTokenChunk } from 'services/api';

interface GameContextProps {
  playerId: string | null;
  token: string | null;
  caveData: Array<[number, number]>;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
  initializeGame: (name: string, complexity: number) => Promise<void>;
  playerName: string; // Додаємо назад playerName
  playerComplexity: number; // Додаємо назад playerComplexity
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [caveData, setCaveData] = useState<Array<[number, number]>>([]);
  const [playerName, setPlayerName] = useState<string>(''); // Додаємо стан playerName
  const [playerComplexity, setPlayerComplexity] = useState<number>(0); // Додаємо стан playerComplexity
  const baseWsUrl = import.meta.env.VITE_API_BASE_WS_URL;

  const initializeGame = async (name: string, complexity: number) => {
    try {
      setPlayerName(name); // Зберігаємо ім'я гравця
      setPlayerComplexity(complexity); // Зберігаємо складність гри
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
        playerName, // Передаємо playerName в контекст
        playerComplexity, // Передаємо playerComplexity в контекст
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
