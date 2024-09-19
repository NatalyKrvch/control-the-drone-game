import { MAX_FIELD_HEIGHT, MAX_FIELD_WIDTH } from 'constants';

import { Drone } from '@components/Drone';
import { CaveProps } from 'types';

import { createCavePath } from './helpers/createCavePath';
import useCave from './hooks/useCave';

const Cave = ({
  dronePosition,
  verticalSpeed,
  setGameStatus,
  gameStatus,
  setScore,
}: CaveProps) => {
  const { caveRef, caveOffset, caveData } = useCave({
    dronePosition,
    verticalSpeed,
    setGameStatus,
    gameStatus,
    setScore,
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
