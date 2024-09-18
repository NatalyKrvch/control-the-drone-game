import { FIELD_WIDTH_CENTER } from 'constants';
import { CheckCollisionParams } from 'types';

export const checkCollision = ({
  area,
  caveData,
  caveOffset,
}: CheckCollisionParams): boolean => {
  for (let y = area.topY; y <= area.bottomY; y++) {
    const globalY = y + caveOffset;
    const segmentIndex = Math.floor(globalY / 10);
    const isValidSegmentIndex =
      segmentIndex >= 0 && segmentIndex < caveData.length;

    if (isValidSegmentIndex) {
      const [leftWall, rightWall] = caveData[segmentIndex];
      const leftBoundary = FIELD_WIDTH_CENTER + leftWall;
      const rightBoundary = FIELD_WIDTH_CENTER + rightWall;
      const isCollisionWithWall =
        area.leftX < leftBoundary || area.rightX > rightBoundary;

      if (isCollisionWithWall) {
        return true;
      }
    }
  }
  return false;
};
