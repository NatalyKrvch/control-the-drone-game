export const LOCAL_STORAGE_KEY = 'gameScores';
export const HORISONTAL_SPEED_MULTIPLIER = 0.5;
export const SPEED_INCREMENT = 1;
export const MAX_HORIZONTAL_SPEED = 10;
export const MAX_VERTICAL_SPEED = 10;
export const MIN_HORIZONTAL_SPEED = -10;
export const MIN_VERTICAL_SPEED = 0;
export const DRONE_MOVE_INTERVAL_MS = 50;

export enum GameStatus {
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost',
}
