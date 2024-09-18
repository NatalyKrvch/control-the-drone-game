import {
  MAX_HORIZONTAL_SPEED,
  MAX_VERTICAL_SPEED,
  MIN_HORIZONTAL_SPEED,
  MIN_VERTICAL_SPEED,
} from 'constants';

import { SpeedGaugesProps } from 'types';

import { SpeedGauge } from './components/SpeedGauge';

const SpeedGauges = ({ horizontalSpeed, verticalSpeed }: SpeedGaugesProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
      }}
    >
      <SpeedGauge
        label="Horizontal Speed"
        speed={horizontalSpeed}
        minSpeed={MIN_HORIZONTAL_SPEED}
        maxSpeed={MAX_HORIZONTAL_SPEED}
      />
      <SpeedGauge
        label="Vertical Speed"
        speed={verticalSpeed}
        minSpeed={MIN_VERTICAL_SPEED}
        maxSpeed={MAX_VERTICAL_SPEED}
      />
    </div>
  );
};

export default SpeedGauges;
