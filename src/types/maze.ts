export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

export interface IMaze {
  isWithinBounds: (coord: Coordinate) => boolean;
  isWalkable: (coord: Coordinate) => boolean;
  isEnd: (coord: Coordinate) => boolean;
  getCost: (coord: Coordinate) => number;
  formatPath: (path: ReadonlyArray<Coordinate>) => string;
  printBoard: (
    current: Coordinate,
    visited: Set<string>,
    currentPath: Coordinate[],
    steps: number
  ) => void;

  getStart: () => Coordinate;
  getEnd: () => Coordinate;
}
