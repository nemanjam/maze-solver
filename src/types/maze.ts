export interface Coordinate {
  readonly x: number;
  readonly y: number;
}

export interface Maze {
  board: number[][];
  start: Coordinate;
  end: Coordinate;
}
