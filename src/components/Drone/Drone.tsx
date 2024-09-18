import { DRONE_HEIGHT, DRONE_OFFSET } from 'constants';

import { DroneProps } from 'types';

const Drone = ({ position }: DroneProps) => {
  return (
    <g>
      <polygon
        points={`${position - DRONE_OFFSET},${DRONE_HEIGHT} ${position + DRONE_OFFSET},${DRONE_HEIGHT} ${position},${DRONE_HEIGHT * 2}`}
        fill="green"
      />
    </g>
  );
};

export default Drone;
