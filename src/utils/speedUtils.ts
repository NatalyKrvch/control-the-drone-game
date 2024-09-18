export const adjustSpeed = (
  setSpeed: React.Dispatch<React.SetStateAction<number>>,
  adjustment: number,
  minSpeed: number,
  maxSpeed: number,
) => {
  setSpeed((prev) => Math.min(Math.max(prev + adjustment, minSpeed), maxSpeed));
};
