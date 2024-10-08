export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

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
