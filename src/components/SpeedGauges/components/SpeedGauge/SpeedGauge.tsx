import ReactSpeedometer, { Transition } from 'react-d3-speedometer';

interface SpeedGaugeProps {
  label: string;
  speed: number;
  minSpeed: number;
  maxSpeed: number;
}

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
        minSpeed + (maxSpeed - minSpeed) / 5,
        minSpeed + (2 * (maxSpeed - minSpeed)) / 5,
        minSpeed + (3 * (maxSpeed - minSpeed)) / 5,
        minSpeed + (4 * (maxSpeed - minSpeed)) / 5,
        maxSpeed,
      ]}
      needleTransition={Transition.easeElastic}
      needleTransitionDuration={1}
    />
  );
};

export default SpeedGauge;
