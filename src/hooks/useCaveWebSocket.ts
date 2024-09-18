import { useEffect } from 'react';
import { UseCaveWebSocketParams } from 'types';

export const useCaveWebSocket = ({
  playerId,
  token,
  baseWsUrl,
  setCaveData,
}: UseCaveWebSocketParams) => {
  const isPlayerInfoMissing = !playerId || !token;

  useEffect(() => {
    if (isPlayerInfoMissing) return;

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
  }, [playerId, token, baseWsUrl, setCaveData]);
};
