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
  // Iterate over the vertical extent of the drone's area
  for (let y = area.topY; y <= area.bottomY; y++) {
    const globalY = y + caveOffset;
    const segmentIndex = Math.floor(globalY / 10);

    if (segmentIndex >= 0 && segmentIndex < caveData.length) {
      const [leftWall, rightWall] = caveData[segmentIndex];
      const leftBoundary = 250 + leftWall;
      const rightBoundary = 250 + rightWall;

      if (area.leftX < leftBoundary || area.rightX > rightBoundary) {
        return true;
      }
    }
  }
  return false;
};
