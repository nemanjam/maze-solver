import { Coordinate } from './maze';

export interface IMazeSolver {
  solve(): string;
  printResult(): PrintResult;
}
export interface PrintResult {
  path: string;
  name: string;
  step: number;
  formattedResult: string;
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

export interface DijkstraQueueElement extends QueueElement {
  cost: number;
}
