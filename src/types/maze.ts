export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

export interface IMaze {
  isWithinBounds: (coord: Coordinate) => boolean;
  isWalkable: (coord: Coordinate) => boolean;
  isEnd: (coord: Coordinate) => boolean;
  formatPath: (path: ReadonlyArray<Coordinate>) => string;

  getStart: () => Coordinate;
  getEnd: () => Coordinate;
}
