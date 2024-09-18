import { GameStatus, VERTICAL_SPEED_MULTIPLIER } from 'constants';
import { useState, useEffect } from 'react';

export const useCaveAnimation = (
  verticalSpeed: number,
  gameStatus: GameStatus,
) => {
  const [caveOffset, setCaveOffset] = useState(0);

  useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    let animationFrameId: number;

    const animate = () => {
      setCaveOffset((prev) => prev + verticalSpeed * VERTICAL_SPEED_MULTIPLIER);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [verticalSpeed, gameStatus]);

  return caveOffset;
};
