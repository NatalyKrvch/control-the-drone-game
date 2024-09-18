import { useCaveAnimation } from '@hooks/useCaveAnimation';
import { useCollisionDetection } from '@hooks/useCollisionDetection';
import { useRef } from 'react';
import { useUpdateScore } from '@hooks/useUpdateScore';
import { useGameContext } from '@hooks/useGameContext';
import { CaveProps } from 'types';

const useCave = ({
  dronePosition,
  verticalSpeed,
  setGameStatus,
  gameStatus,
  setScore,
}: CaveProps) => {
  const { caveData, playerComplexity } = useGameContext();
  const caveOffset = useCaveAnimation(verticalSpeed, gameStatus);
  const caveRef = useRef<SVGSVGElement | null>(null);

  useCollisionDetection({
    dronePosition,
    caveOffset,
    gameStatus,
    setGameStatus,
    serverFinished: caveData.length === 0,
  });

  useUpdateScore({
    caveOffset,
    verticalSpeed,
    setScore,
    playerComplexity,
  });

  return {
    caveRef,
    caveOffset,
    caveData,
  };
};

export default useCave;
