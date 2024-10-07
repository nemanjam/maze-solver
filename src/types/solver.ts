import { Coordinate } from './maze';

export interface IMazeSolver {
  solve(): string;
}

export interface Direction {
  x: number;
  y: number;
}

export interface QueueElement {
  coord: Coordinate;
  path: Coordinate[];
}
export interface BFSQueueElement extends QueueElement {}

export interface DFSStackElement extends QueueElement {}
