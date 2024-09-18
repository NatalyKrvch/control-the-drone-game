import { FIELD_WIDTH_CENTER } from 'constants';

interface Area {
  topY: number;
  bottomY: number;
  leftX: number;
  rightX: number;
}

interface CheckCollisionParams {
  area: Area;
  caveData: Array<[number, number]>;
  caveOffset: number;
}

export const checkCollision = ({
  area,
  caveData,
  caveOffset,
}: CheckCollisionParams): boolean => {
  for (let y = area.topY; y <= area.bottomY; y++) {
    const globalY = y + caveOffset;
    const segmentIndex = Math.floor(globalY / 10);

    if (segmentIndex >= 0 && segmentIndex < caveData.length) {
      const [leftWall, rightWall] = caveData[segmentIndex];
      const leftBoundary = FIELD_WIDTH_CENTER + leftWall;
      const rightBoundary = FIELD_WIDTH_CENTER + rightWall;

      if (area.leftX < leftBoundary || area.rightX > rightBoundary) {
        return true;
      }
    }
  }
  return false;
};
