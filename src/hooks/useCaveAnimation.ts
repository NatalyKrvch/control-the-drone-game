import { GameStatus, VERTICAL_SPEED_MULTIPLIER } from 'constants';

import { useEffect, useState } from 'react';

export const useCaveAnimation = (
  verticalSpeed: number,
  gameStatus: GameStatus,
) => {
  const [caveOffset, setCaveOffset] = useState(0);
  const isGameNotPlaying = gameStatus !== GameStatus.Playing;

  useEffect(() => {
    if (isGameNotPlaying) return;

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
