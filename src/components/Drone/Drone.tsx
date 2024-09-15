interface DroneProps {
  position: number;
}

const Drone = ({ position }: DroneProps) => {
  return (
    <g>
      <polygon
        points={`${position - 5},10 ${position + 5},10 ${position},20`}
        fill="green"
      />
    </g>
  );
};

export default Drone;
