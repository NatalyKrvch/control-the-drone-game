import { CalculateDroneRegionsParams, DroneRegion, DroneRegions } from 'types';

export const calculateDroneRegions = ({
  droneX,
  droneY,
  droneWidth,
  noseHeight,
  backHeight,
  sideWidth,
}: CalculateDroneRegionsParams): DroneRegions => {
  const totalHeight = noseHeight + backHeight;

  const nose: DroneRegion = {
    topY: droneY,
    bottomY: droneY + noseHeight,
    leftX:
      droneX - (droneWidth / 2) * ((totalHeight - noseHeight) / totalHeight),
    rightX:
      droneX + (droneWidth / 2) * ((totalHeight - noseHeight) / totalHeight),
  };

  const back: DroneRegion = {
    topY: droneY + noseHeight,
    bottomY: droneY + totalHeight,
    leftX: droneX - droneWidth / 2,
    rightX: droneX + droneWidth / 2,
  };

  const leftSide: DroneRegion = {
    topY: droneY,
    bottomY: droneY + totalHeight,
    leftX: droneX - droneWidth / 2,
    rightX: droneX - droneWidth / 2 + sideWidth,
  };

  const rightSide: DroneRegion = {
    topY: droneY,
    bottomY: droneY + totalHeight,
    leftX: droneX + droneWidth / 2 - sideWidth,
    rightX: droneX + droneWidth / 2,
  };

  return { nose, back, leftSide, rightSide };
};
