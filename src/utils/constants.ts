import { Direction } from '../types/solver';

/** Possible directions. 4 way. */
export const directions: Direction[] = [
  { x: 0, y: 1 }, // right
  { x: 1, y: 0 }, // down
  { x: 0, y: -1 }, // left
  { x: -1, y: 0 }, // up
];
