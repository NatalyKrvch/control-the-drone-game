import { useState, useEffect } from 'react';

export const useCaveAnimation = (verticalSpeed: number) => {
  const [caveOffset, setCaveOffset] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      setCaveOffset((prev) => prev + verticalSpeed);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [verticalSpeed]);

  return caveOffset;
};
