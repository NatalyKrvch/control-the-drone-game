import { useCaveAnimation } from '@hooks/useCaveAnimation';
import { useCollisionDetection } from '@hooks/useCollisionDetection';
import React, { useRef } from 'react';
import { createCavePath } from './helpers/createCavePath';
import Drone from '@components/Drone/Drone';
import { useUpdateScore } from '@hooks/useUpdateScore';
import { useGameContext } from '@hooks/useGameContext';
import { GameStatus, MAX_FIELD_HEIGHT, MAX_FIELD_WIDTH } from 'constants';

interface CaveProps {
  dronePosition: number;
  verticalSpeed: number;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  gameStatus: GameStatus;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
}

const Cave = ({
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

  return (
    <div>
      <svg
        ref={caveRef}
        width={MAX_FIELD_WIDTH}
        height={MAX_FIELD_HEIGHT}
        style={{ backgroundColor: 'gray' }}
      >
        <path
          d={createCavePath(caveData, caveOffset)}
          fill="white"
          stroke="black"
        />
        <Drone position={dronePosition} />
      </svg>
    </div>
  );
};

export default Cave;
