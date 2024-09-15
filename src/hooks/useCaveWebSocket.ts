import { useGameContext } from '@contextsGameContext';
import { useEffect, useState } from 'react';

export const useCaveWebSocket = (
  playerId: string | null,
  token: string | null,
) => {
  const { setCaveData } = useGameContext();
  const [serverFinished, setServerFinished] = useState(false);

  useEffect(() => {
    if (!playerId || !token) return;

    const baseWsUrl = import.meta.env.VITE_API_BASE_WS_URL;
    const ws = new WebSocket(baseWsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
      ws.send(`player:${playerId}-${token}`);
    };

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);

      if (message === 'finished') {
        console.log('Server has finished sending cave data.');
        ws.close();
        setServerFinished(true);
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
  }, [playerId, token, setCaveData]);

  return serverFinished;
};
