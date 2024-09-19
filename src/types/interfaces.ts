import { GameStatus } from 'constants';

export interface CaveProps {
  dronePosition: number;
  verticalSpeed: number;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  gameStatus: GameStatus;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score?: number;
}

export interface DroneRegion {
  topY: number;
  bottomY: number;
  leftX: number;
  rightX: number;
}

export interface CalculateDroneRegionsParams {
  droneX: number;
  droneY: number;
  droneWidth: number;
  noseHeight: number;
  backHeight: number;
  sideWidth: number;
}

export interface DroneRegions {
  nose: DroneRegion;
  back: DroneRegion;
  leftSide: DroneRegion;
  rightSide: DroneRegion;
}

export interface Area {
  topY: number;
  bottomY: number;
  leftX: number;
  rightX: number;
}

export interface CheckCollisionParams {
  area: Area;
  caveData: Array<[number, number]>;
  caveOffset: number;
}

export interface DroneProps {
  position: number;
}

export interface GameOverModalProps {
  gameStatus: GameStatus.Won | GameStatus.Lost;
  onRestart: () => void;
  score: number;
}

export interface ScoreboardProps {
  scores: GameScore[];
}

export interface SpeedGaugesProps {
  horizontalSpeed: number;
  verticalSpeed: number;
}

export interface SpeedGaugeProps {
  label: string;
  speed: number;
  minSpeed: number;
  maxSpeed: number;
}

export interface GameContextProps {
  playerId: string | null;
  token: string | null;
  caveData: Array<[number, number]>;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
  initializeGame: (name: string, complexity: number) => Promise<void>;
  playerName: string;
  playerComplexity: number;
}

export interface UseCaveWebSocketParams {
  playerId: string | null;
  token: string | null;
  baseWsUrl: string;
  setCaveData: React.Dispatch<React.SetStateAction<Array<[number, number]>>>;
}

export interface UseCollisionDetectionParams {
  dronePosition: number;
  caveOffset: number;
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  serverFinished: boolean;
}
export interface UseUpdateScoreParams {
  caveOffset: number;
  verticalSpeed: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  playerComplexity: number;
}

export interface GameScore {
  name: string;
  complexity: number;
  score: number;
}
