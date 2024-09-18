import { CAVE_SEGMENT_HEIGHT, FIELD_WIDTH_CENTER } from 'constants';

export const createCavePath = (
  caveData: Array<[number, number]>,
  caveOffset: number,
) => {
  if (caveData.length === 0) return '';

  let path = `M ${FIELD_WIDTH_CENTER + caveData[0][0]} ${-caveOffset}`;

  caveData.forEach((point, index) => {
    if (index < caveData.length - 1) {
      const [leftWall, rightWall] = point;
      const [nextLeftWall, nextRightWall] = caveData[index + 1];

      if (!isNaN(leftWall) && !isNaN(nextLeftWall)) {
        const controlPointX1 = FIELD_WIDTH_CENTER + leftWall;
        const controlPointX2 = FIELD_WIDTH_CENTER + nextLeftWall;
        const currentHeight = index * CAVE_SEGMENT_HEIGHT - caveOffset;
        const nextHeight = (index + 1) * CAVE_SEGMENT_HEIGHT - caveOffset;
        const endX = FIELD_WIDTH_CENTER + nextLeftWall;

        path += ` C ${controlPointX1} ${currentHeight}, ${controlPointX2} ${nextHeight}, ${endX} ${nextHeight}`;
      }
    }
  });

  for (let i = caveData.length - 1; i >= 0; i--) {
    const [leftWall, rightWall] = caveData[i];
    const [prevLeftWall, prevRightWall] = i > 0 ? caveData[i - 1] : [0, 0];

    if (!isNaN(rightWall) && !isNaN(prevRightWall)) {
      const controlPointX1 = FIELD_WIDTH_CENTER + rightWall;
      const controlPointX2 = FIELD_WIDTH_CENTER + prevRightWall;
      const currentHeight = i * CAVE_SEGMENT_HEIGHT - caveOffset;
      const prevHeight = (i - 1) * CAVE_SEGMENT_HEIGHT - caveOffset;
      const endX = FIELD_WIDTH_CENTER + prevRightWall;

      path += ` C ${controlPointX1} ${currentHeight}, ${controlPointX2} ${prevHeight}, ${endX} ${prevHeight}`;
    }
  }

  path += ' Z';
  return path;
};
