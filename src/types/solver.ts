import { Coordinate } from './maze';

/** Public interface for a maze solver. */
export interface IMazeSolver {
  solve(): string;
  solveAndFormat(): FormattedResult;
}

/** Human-friendly formatted result of a maze solver with additional information. */
export interface FormattedResult {
  path: string;
  name: string;
  step: number;
  formattedResult: string;
}

/**
 * Direction for the next step.
 * @property {number} x - Movement in the x direction (row).
 * @property {number} y - Movement in the y direction (column).
 */
export interface Direction {
  x: number;
  y: number;
}

/** Base queue. */
export interface QueueElement {
  coord: Coordinate;
  path: Coordinate[];
}

/** BFS queue. FIFO. */
export interface BFSQueueElement extends QueueElement {}

/** DFS queue. LIFO. */
export interface DFSStackElement extends QueueElement {}

/** Dijkstra and A* priority Queue with cost. */
export interface DijkstraQueueElement extends QueueElement {
  cost: number;
}
