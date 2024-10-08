/**
 * Represents a coordinate with x and y values.
 * @property {number} x - The x-coordinate (row) of the point in the maze.
 * @property {number} y - The y-coordinate (column) of the point in the maze.
 */
export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

/** Public interface for the Maze class. */
export interface IMaze {
  isWithinBounds: (coord: Coordinate) => boolean;
  isWalkable: (coord: Coordinate) => boolean;
  isEnd: (coord: Coordinate) => boolean;
  getCost: (coord: Coordinate) => number;
  getBoard(): number[][];
  getStart: () => Coordinate;
  getEnd: () => Coordinate;
  formatPath: (path: ReadonlyArray<Coordinate>) => string;
}
