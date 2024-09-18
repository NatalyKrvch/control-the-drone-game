import { calculateDroneRegions } from '@components/Cave/helpers/calculateDroneRegions';
import { checkCollision } from '@components/Cave/helpers/checkCollision';
import { useEffect } from 'react';
import { useGameContext } from './useGameContext';
import {
  CAVE_SEGMENT_HEIGHT,
  DRONE_BACK_HEIGHT,
  DRONE_INITIAL_Y_POSITION,
  DRONE_NOSE_HEIGHT,
  DRONE_SIDE_WIDTH,
  DRONE_WIDTH,
  GameStatus,
} from 'constants';

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
    const droneY = DRONE_INITIAL_Y_POSITION;
    const noseHeight = DRONE_NOSE_HEIGHT;
    const backHeight = DRONE_BACK_HEIGHT;
    const droneWidth = DRONE_WIDTH;
    const sideWidth = DRONE_SIDE_WIDTH; // Width of the side areas

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

    if (serverFinished) {
      const totalCaveHeight = caveData.length * CAVE_SEGMENT_HEIGHT;
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
