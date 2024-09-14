import Drone from '@components/Drone/Drone';
import SpeedGauges from '@components/SpeedGauges/SpeedGauges';
import { useGameContext } from '@contexts/GameContext';
import { useCaveAnimation } from '@hooks/useCaveAnimation';
import { useDroneControls } from '@hooks/useDroneControls';
import { useRef } from 'react';

import { createCavePath } from './helpers/createCavePath';

const Cave = () => {
  const { caveData } = useGameContext();
  const { dronePosition, horizontalSpeed, verticalSpeed } = useDroneControls(
    250,
    500,
  );
  const caveOffset = useCaveAnimation(verticalSpeed);
  const caveRef = useRef<SVGSVGElement | null>(null);

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
      <SpeedGauges
        horizontalSpeed={horizontalSpeed}
        verticalSpeed={verticalSpeed}
      />
    </div>
  );
};

export default Cave;
