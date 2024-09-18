import {
  CAVE_SEGMENT_HEIGHT,
  DRONE_BACK_HEIGHT,
  DRONE_INITIAL_Y_POSITION,
  DRONE_NOSE_HEIGHT,
  DRONE_SIDE_WIDTH,
  DRONE_WIDTH,
  GameStatus,
} from 'constants';

import { calculateDroneRegions, checkCollision } from '@components/Cave';
import { useEffect } from 'react';
import { UseCollisionDetectionParams } from 'types';

import { useGameContext } from './useGameContext';

export const useCollisionDetection = ({
  dronePosition,
  caveOffset,
  gameStatus,
  setGameStatus,
  serverFinished,
}: UseCollisionDetectionParams) => {
  const { caveData } = useGameContext();
  const shouldSkipCollisionDetection =
    caveData.length === 0 || gameStatus !== GameStatus.Playing;

  const noseHeight = DRONE_NOSE_HEIGHT;
  const backHeight = DRONE_BACK_HEIGHT;
  const droneWidth = DRONE_WIDTH;
  const sideWidth = DRONE_SIDE_WIDTH;

  const droneX = dronePosition;
  const droneY = DRONE_INITIAL_Y_POSITION;

  const { nose, back, leftSide, rightSide } = calculateDroneRegions({
    droneX,
    droneY,
    droneWidth,
    noseHeight,
    backHeight,
    sideWidth,
  });

  useEffect(() => {
    if (shouldSkipCollisionDetection) return;

    const isNoseCollision = checkCollision({
      area: nose,
      caveData,
      caveOffset,
    });
    const isBackCollision = checkCollision({
      area: back,
      caveData,
      caveOffset,
    });
    const isLeftSideCollision = checkCollision({
      area: leftSide,
      caveData,
      caveOffset,
    });
    const isRightSideCollision = checkCollision({
      area: rightSide,
      caveData,
      caveOffset,
    });

    const isCollisionDetected =
      isNoseCollision ||
      isBackCollision ||
      isLeftSideCollision ||
      isRightSideCollision;

    if (isCollisionDetected) {
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
    nose,
    back,
    leftSide,
    rightSide,
    caveOffset,
    caveData,
    gameStatus,
    setGameStatus,
    serverFinished,
  ]);
};
