import { Direction } from '../types/solver';

/** Possible directions. 4 way. */
export const directions: Direction[] = [
  { x: 0, y: 1 }, // up
  { x: 1, y: 0 }, // right
  { x: 0, y: -1 }, // down
  { x: -1, y: 0 }, // left
];
