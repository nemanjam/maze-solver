// maze.ts
import { Coordinate } from './types';

export class Maze {
  private board: number[][];
  private start: Coordinate;
  private end: Coordinate;

  private readonly rows: number;
  private readonly cols: number;

  private constructor(board: number[][], start: Coordinate, end: Coordinate) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.rows = board.length;
    this.cols = board[0].length;
  }

  // Factory method to create a new maze
  static create(board: number[][], start: Coordinate, end: Coordinate): Maze {
    return new Maze(board, start, end);
  }

  // Check if a coordinate is within the maze bounds
  public isWithinBounds(coord: Coordinate): boolean {
    return (
      coord.x >= 0 && coord.x < this.rows && coord.y >= 0 && coord.y < this.cols
    );
  }

  // Check if a coordinate is a walkable path (i.e., not a wall)
  public isWalkable(coord: Coordinate): boolean {
    return this.board[coord.x][coord.y] === 0;
  }

  // Check if a coordinate is the maze end
  public isEnd(coord: Coordinate): boolean {
    return coord.x === this.end.x && coord.y === this.end.y;
  }

  // Format and print the maze with the solution path
  public formatPath(path: ReadonlyArray<Coordinate>): string {
    const formattedMaze = this.board.map((row, x) =>
      row.map((cell, y) => {
        const onPath = path.some((coord) => coord.x === x && coord.y === y);
        if (onPath) return 'P'; // Mark the path
        return cell === 1 ? '#' : '.'; // Wall or open space
      })
    );

    return formattedMaze.map((row) => row.join(' ')).join('\n');
  }

  public getStart(): Coordinate {
    return this.start;
  }

  public getEnd(): Coordinate {
    return this.end;
  }
}
