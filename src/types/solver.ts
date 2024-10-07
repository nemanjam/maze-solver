import { Coordinate } from './maze';

export interface MazeSolver {
  solve(): string;
}

export interface Direction {
  x: number;
  y: number;
}

export interface BFSQueueElement {
  coord: Coordinate;
  path: Coordinate[];
}
