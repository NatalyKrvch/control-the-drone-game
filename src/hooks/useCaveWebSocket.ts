import { useEffect } from 'react';

interface UseCaveWebSocketParams {
  playerId: string | null;
  token: string | null;
  baseWsUrl: string;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
}

export const useCaveWebSocket = ({
  playerId,
  token,
  baseWsUrl,
  setCaveData,
}: UseCaveWebSocketParams) => {
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
  }, [playerId, token, baseWsUrl, setCaveData]);
};
