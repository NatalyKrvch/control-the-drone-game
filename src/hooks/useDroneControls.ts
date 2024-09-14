import { useEffect, useState } from 'react';

export const useDroneControls = (initialPosition: number, maxWidth: number) => {
  const [dronePosition, setDronePosition] = useState(initialPosition);
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(1);

  const speedIncrement = 3;

  const handleKeyDown = (event: KeyboardEvent) => {
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
        setVerticalSpeed((prev) => Math.max(prev - speedIncrement, 1));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const moveDrone = () => {
      setDronePosition((prev) => {
        let newPosition = prev + horizontalSpeed;
        if (newPosition < 0) newPosition = 0;
        if (newPosition > maxWidth) newPosition = maxWidth;
        return newPosition;
      });
    };

    const interval = setInterval(moveDrone, 50);

    return () => {
      clearInterval(interval);
    };
  }, [horizontalSpeed]);

  return { dronePosition, horizontalSpeed, verticalSpeed };
};
