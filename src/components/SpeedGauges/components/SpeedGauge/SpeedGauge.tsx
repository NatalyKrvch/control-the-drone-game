import { SPEEDOMETER_SEGMENTS_COUNT } from 'constants';

import ReactSpeedometer, { Transition } from 'react-d3-speedometer';
import { SpeedGaugeProps } from 'types';

const SpeedGauge = ({ label, speed, minSpeed, maxSpeed }: SpeedGaugeProps) => {
  return (
    <ReactSpeedometer
      minValue={minSpeed}
      maxValue={maxSpeed}
      value={speed}
      needleColor="red"
      startColor="green"
      endColor="red"
      segments={5}
      width={200}
      height={150}
      currentValueText={`${label}: ${speed}`}
      customSegmentStops={[
        minSpeed,
        minSpeed + (maxSpeed - minSpeed) / SPEEDOMETER_SEGMENTS_COUNT,
        minSpeed + (2 * (maxSpeed - minSpeed)) / SPEEDOMETER_SEGMENTS_COUNT,
        minSpeed + (3 * (maxSpeed - minSpeed)) / SPEEDOMETER_SEGMENTS_COUNT,
        minSpeed + (4 * (maxSpeed - minSpeed)) / SPEEDOMETER_SEGMENTS_COUNT,
        maxSpeed,
      ]}
      needleTransition={Transition.easeElastic}
      needleTransitionDuration={1}
    />
  );
};

export default SpeedGauge;
