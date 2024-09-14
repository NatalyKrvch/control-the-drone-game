export const createCavePath = (
  caveData: Array<[number, number]>,
  caveOffset: number,
) => {
  if (caveData.length === 0) return '';

  let path = `M ${250 + caveData[0][0]} ${-caveOffset}`;

  caveData.forEach((point, index) => {
    if (index < caveData.length - 1) {
      const [leftWall, rightWall] = point;
      const [nextLeftWall, nextRightWall] = caveData[index + 1];

      if (!isNaN(leftWall) && !isNaN(nextLeftWall)) {
        const controlPointX1 = 250 + leftWall;
        const controlPointX2 = 250 + nextLeftWall;

        path += ` C ${controlPointX1} ${index * 10 - caveOffset}, ${controlPointX2} ${(index + 1) * 10 - caveOffset}, ${250 + nextLeftWall} ${(index + 1) * 10 - caveOffset}`;
      }
    }
  });

  for (let i = caveData.length - 1; i >= 0; i--) {
    const [leftWall, rightWall] = caveData[i];
    const [prevLeftWall, prevRightWall] = i > 0 ? caveData[i - 1] : [0, 0];

    if (!isNaN(rightWall) && !isNaN(prevRightWall)) {
      const controlPointX1 = 250 + rightWall;
      const controlPointX2 = 250 + prevRightWall;

      path += ` C ${controlPointX1} ${i * 10 - caveOffset}, ${controlPointX2} ${(i - 1) * 10 - caveOffset}, ${250 + prevRightWall} ${(i - 1) * 10 - caveOffset}`;
    }
  }

  path += ' Z';
  return path;
};
