import {
  DRONE_MOVE_INTERVAL_MS,
  GameStatus,
  HORISONTAL_SPEED_MULTIPLIER,
  MAX_HORIZONTAL_SPEED,
  MAX_VERTICAL_SPEED,
  MIN_HORIZONTAL_SPEED,
  MIN_VERTICAL_SPEED,
  SPEED_INCREMENT,
} from 'constants';
import { useEffect, useState } from 'react';
import { adjustSpeed } from 'utils/speedUtils';

export const useDroneControls = (
  initialPosition: number,
  maxWidth: number,
  gameStatus: GameStatus,
) => {
  const [dronePosition, setDronePosition] = useState(initialPosition);
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(0);

  const isGamePlaying = gameStatus === GameStatus.Playing;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isGamePlaying) return;

    switch (event.key) {
      case 'ArrowLeft':
        adjustSpeed(
          setHorizontalSpeed,
          -SPEED_INCREMENT,
          MIN_HORIZONTAL_SPEED,
          MAX_HORIZONTAL_SPEED,
        );
        break;
      case 'ArrowRight':
        adjustSpeed(
          setHorizontalSpeed,
          SPEED_INCREMENT,
          MIN_HORIZONTAL_SPEED,
          MAX_HORIZONTAL_SPEED,
        );
        break;
      case 'ArrowDown':
        adjustSpeed(
          setVerticalSpeed,
          SPEED_INCREMENT,
          MIN_VERTICAL_SPEED,
          MAX_VERTICAL_SPEED,
        );
        break;
      case 'ArrowUp':
        adjustSpeed(
          setVerticalSpeed,
          -SPEED_INCREMENT,
          MIN_VERTICAL_SPEED,
          MAX_VERTICAL_SPEED,
        );
        break;
      default:
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
    if (!isGamePlaying) return;

    const moveDrone = () => {
      setDronePosition((prev) => {
        let newPosition = prev + horizontalSpeed * HORISONTAL_SPEED_MULTIPLIER;
        if (newPosition < 0) newPosition = 0;
        if (newPosition > maxWidth) newPosition = maxWidth;
        return newPosition;
      });
    };

    const interval = setInterval(moveDrone, DRONE_MOVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [horizontalSpeed, maxWidth, gameStatus]);

  return { dronePosition, horizontalSpeed, verticalSpeed };
};
