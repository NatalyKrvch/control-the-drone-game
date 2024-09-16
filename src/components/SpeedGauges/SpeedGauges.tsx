import SpeedGauge from './components/SpeedGauge/SpeedGauge';

interface SpeedGaugesProps {
  horizontalSpeed: number;
  verticalSpeed: number;
}

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
        minSpeed={-10}
        maxSpeed={10}
      />
      <SpeedGauge
        label="Vertical Speed"
        speed={verticalSpeed}
        minSpeed={0}
        maxSpeed={10}
      />
    </div>
  );
};

export default SpeedGauges;
