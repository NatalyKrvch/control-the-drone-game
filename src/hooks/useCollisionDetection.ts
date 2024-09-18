import { calculateDroneRegions } from '@components/Cave/helpers/calculateDroneRegions';
import { checkCollision } from '@components/Cave/helpers/checkCollision';
import { useEffect } from 'react';
import { useGameContext } from './useGameContext';
import { GameStatus } from 'constants';

interface UseCollisionDetectionParams {
  dronePosition: number;
  caveOffset: number;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  serverFinished: boolean;
}

export const useCollisionDetection = ({
  dronePosition,
  caveOffset,
  gameStatus,
  setGameStatus,
  serverFinished,
}: UseCollisionDetectionParams) => {
  const { caveData } = useGameContext();

  useEffect(() => {
    if (caveData.length === 0 || gameStatus !== GameStatus.Playing) return;

    // Drone dimensions
    const droneX = dronePosition;
    const droneY = 10; // Top Y coordinate of the drone
    const noseHeight = 5;
    const backHeight = 5;
    const droneWidth = 10; // Drone's width at its widest point
    const sideWidth = 2; // Width of the side areas

    // Calculates drone regions
    const { nose, back, leftSide, rightSide } = calculateDroneRegions({
      droneX,
      droneY,
      droneWidth,
      noseHeight,
      backHeight,
      sideWidth,
    });

    // Collision detection
    if (
      checkCollision({ area: nose, caveData, caveOffset }) ||
      checkCollision({ area: back, caveData, caveOffset }) ||
      checkCollision({ area: leftSide, caveData, caveOffset }) ||
      checkCollision({ area: rightSide, caveData, caveOffset })
    ) {
      console.log('Collision detected');
      setGameStatus(GameStatus.Lost);
      return;
    }

    // Check if the drone has reached the end of the cave
    if (serverFinished) {
      // Calculates the total height of the cave
      const totalCaveHeight = caveData.length * 10;
      // Checks if the cave has completely passed the drone
      if (caveOffset >= totalCaveHeight) {
        console.log('Drone has reached the end of the cave.');
        setGameStatus(GameStatus.Won);
      }
    }
  }, [
    dronePosition,
    caveOffset,
    caveData,
    gameStatus,
    setGameStatus,
    serverFinished,
  ]);
};
