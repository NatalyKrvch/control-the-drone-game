export const LOCAL_STORAGE_KEY = 'gameScores';

export const MAX_FIELD_WIDTH = 500;
export const FIELD_WIDTH_CENTER = MAX_FIELD_WIDTH / 2;
export const MAX_FIELD_HEIGHT = 600;

export const CHUNKS_PER_PLAYER = 4;

export const HORISONTAL_SPEED_MULTIPLIER = 0.5;
export const SPEED_INCREMENT = 1;
export const MAX_HORIZONTAL_SPEED = 10;
export const MAX_VERTICAL_SPEED = 10;
export const MIN_HORIZONTAL_SPEED = -10;
export const MIN_VERTICAL_SPEED = 0;

export const DRONE_MOVE_INTERVAL_MS = 50;
export const DRONE_INITIAL_Y_POSITION = 10;
export const DRONE_INITIAL_X_POSITION = 250;
export const DRONE_NOSE_HEIGHT = 5;
export const DRONE_BACK_HEIGHT = 5;
export const DRONE_WIDTH = 10;
export const DRONE_HEIGHT = 10;
export const DRONE_SIDE_WIDTH = 2;
export const DRONE_OFFSET = 5;

export const CAVE_SEGMENT_HEIGHT = 10;
export const VERTICAL_SPEED_MULTIPLIER = 0.5;

export const SPEEDOMETER_SEGMENTS_COUNT = 5;

export enum GameStatus {
  Playing = 'playing',
  Won = 'won',
  Lost = 'lost',
}
