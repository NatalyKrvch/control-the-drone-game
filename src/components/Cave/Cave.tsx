import { useGameContext } from '@contextsGameContext';
import { useCaveAnimation } from '@hooks/useCaveAnimation';
import { useCaveWebSocket } from '@hooks/useCaveWebSocket';
import { useCollisionDetection } from '@hooks/useCollisionDetection';
import React, { useRef } from 'react';
import { createCavePath } from './helpers/createCavePath';
import Drone from '@components/Drone/Drone';

interface CaveProps {
  dronePosition: number;
  verticalSpeed: number;
  setGameStatus: React.Dispatch<
    React.SetStateAction<'playing' | 'won' | 'lost'>
  >;
  gameStatus: 'playing' | 'won' | 'lost';
  setCollisionType: React.Dispatch<
    React.SetStateAction<'nose' | 'back' | 'side' | null>
  >;
}

const Cave = ({
  dronePosition,
  verticalSpeed,
  setGameStatus,
  gameStatus,
}: CaveProps) => {
  const { playerId, token, caveData } = useGameContext();
  const caveOffset = useCaveAnimation(verticalSpeed, gameStatus);
  const caveRef = useRef<SVGSVGElement | null>(null);
  const serverFinished = useCaveWebSocket(playerId, token);

  useCollisionDetection({
    dronePosition,
    caveOffset,
    gameStatus,
    setGameStatus,
    serverFinished,
  });

  return (
    <div>
      <svg
        ref={caveRef}
        width="500"
        height="600"
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
