import { useEffect, useState } from 'react';

export const useDroneControls = (
  initialPosition: number,
  maxWidth: number,
  gameStatus: 'playing' | 'won' | 'lost',
) => {
  const [dronePosition, setDronePosition] = useState(initialPosition);
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(0);

  const speedIncrement = 1;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameStatus !== 'playing') return;

    switch (event.key) {
      case 'ArrowLeft':
        setHorizontalSpeed((prev) => Math.max(prev - speedIncrement, -10));
        break;
      case 'ArrowRight':
        setHorizontalSpeed((prev) => Math.min(prev + speedIncrement, 10));
        break;
      case 'ArrowDown':
        setVerticalSpeed((prev) => Math.min(prev + speedIncrement, 10));
        break;
      case 'ArrowUp':
        setVerticalSpeed((prev) => Math.max(prev - speedIncrement, 0));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const moveDrone = () => {
      setDronePosition((prev) => {
        let newPosition = prev + horizontalSpeed * 0.5;
        if (newPosition < 0) newPosition = 0;
        if (newPosition > maxWidth) newPosition = maxWidth;
        return newPosition;
      });
    };

    const interval = setInterval(moveDrone, 50);

    return () => {
      clearInterval(interval);
    };
  }, [horizontalSpeed, maxWidth, gameStatus]);

  return { dronePosition, horizontalSpeed, verticalSpeed };
};
