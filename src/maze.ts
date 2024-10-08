import { Coordinate, IMaze } from './types/maze';
import { cells } from './utils/colors';

/** Represents a maze as a 2D array with start and end points. */
export class Maze implements IMaze {
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

  /**
   * Factory method to create a new Maze instance.
   * @param board - 2D array representing the maze layout.
   * @param start - Starting coordinate.
   * @param end - End coordinate.
   * @returns A new instance of the Maze class.
   */
  static create(board: number[][], start: Coordinate, end: Coordinate): Maze {
    return new Maze(board, start, end);
  }

  /** Check if a coordinate is within the maze bounds. */
  public isWithinBounds(coord: Coordinate): boolean {
    return (
      coord.x >= 0 && coord.x < this.rows && coord.y >= 0 && coord.y < this.cols
    );
  }

  /** Check if a coordinate is a walkable path (i.e., not a wall). */
  public isWalkable(coord: Coordinate): boolean {
    return this.board[coord.x][coord.y] === 0;
  }

  /** Check if a coordinate is the maze end. */
  public isEnd(coord: Coordinate): boolean {
    return coord.x === this.end.x && coord.y === this.end.y;
  }

  /** Returns the cost associated with moving to the specified coordinate. Used for Dijkstra and A*. */
  public getCost(coord: Coordinate): number {
    // Check if the coordinate is within the maze bounds and is walkable.
    if (!(this.isWithinBounds(coord) && this.isWalkable(coord))) {
      return Infinity;
    }

    return 1;
  }

  /** Expose board readonly. Solvers need the board for logging. */
  public getBoard(): number[][] {
    return this.board;
  }

  /** Expose for solvers. */
  public getStart(): Coordinate {
    return this.start;
  }

  /** Expose for solvers. */
  public getEnd(): Coordinate {
    return this.end;
  }

  /** Format and print the maze with the solution path. */
  public formatPath(path: ReadonlyArray<Coordinate>): string {
    const formattedMaze = this.board.map((row, x) =>
      row.map((cell, y) => {
        const onPath = path.some((coord) => coord.x === x && coord.y === y);
        if (onPath) return cells.path; // Mark the path.
        return cell === 1 ? '1' : '0'; // Wall or open space.
      })
    );

    const output = formattedMaze.map((row) => row.join(' ')).join('\n');
    return output;
  }
}
