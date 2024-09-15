import { useState, useEffect } from 'react';

export const useCaveAnimation = (
  verticalSpeed: number,
  gameStatus: 'playing' | 'won' | 'lost',
) => {
  const [caveOffset, setCaveOffset] = useState(0);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    let animationFrameId: number;

    const animate = () => {
      setCaveOffset((prev) => prev + verticalSpeed * 0.5);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [verticalSpeed, gameStatus]);

  return caveOffset;
};
