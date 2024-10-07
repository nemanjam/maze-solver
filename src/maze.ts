import { Coordinate, IMaze } from './types/maze';
import { cells } from './utils/colors';

export class Maze implements IMaze {
  private board: number[][];
  private start: Coordinate;
  private end: Coordinate;

  private readonly rows: number;
  private readonly cols: number;

  private enableDebugging: boolean;
  private step = 0;

  private constructor(
    board: number[][],
    start: Coordinate,
    end: Coordinate,
    enableDebugging: boolean
  ) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.rows = board.length;
    this.cols = board[0].length;
    this.enableDebugging = enableDebugging;
  }

  // Factory method to create a new maze
  static create(
    board: number[][],
    start: Coordinate,
    end: Coordinate,
    enableDebugging = false
  ): Maze {
    return new Maze(board, start, end, enableDebugging);
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

  // Returns the cost associated with moving to the specified coordinate
  public getCost(coord: Coordinate): number {
    // Check if the coordinate is within the maze bounds and is walkable
    if (!(this.isWithinBounds(coord) && this.isWalkable(coord))) {
      return Infinity;
    }

    return 1;
  }

  // Format and print the maze with the solution path
  public formatPath(path: ReadonlyArray<Coordinate>): string {
    const formattedMaze = this.board.map((row, x) =>
      row.map((cell, y) => {
        const onPath = path.some((coord) => coord.x === x && coord.y === y);
        if (onPath) return cells.path; // Mark the path
        return cell === 1 ? '1' : '0'; // Wall or open space
      })
    );

    const output = formattedMaze.map((row) => row.join(' ')).join('\n');
    return output;
  }

  public printBoard(
    current: Coordinate,
    visited: Set<string>,
    currentPath: Coordinate[]
  ): void {
    if (!this.enableDebugging) {
      return;
    }

    // Create a copy of the board to modify for display
    const displayBoard: string[][] = this.board.map((row) => [
      ...row.map((cell) => String(cell)),
    ]);

    displayBoard[current.x][current.y] = cells.current;

    for (const coord of currentPath) {
      if (displayBoard[coord.x][coord.y] !== cells.current) {
        displayBoard[coord.x][coord.y] = cells.path;
      }
    }

    // Mark visited positions with blue '0', avoiding overwriting the path or current element
    for (const coordKey of visited) {
      const [x, y] = coordKey.split(',').map(Number);
      if (
        displayBoard[x][y] !== cells.path &&
        displayBoard[x][y] !== cells.current
      ) {
        displayBoard[x][y] = cells.visited;
      }
    }

    const output = `Step ${++this.step}:\n${displayBoard
      .map((row) => row.join(' '))
      .join('\n')}\n`;
    console.log(output);
  }

  public getStart(): Coordinate {
    return this.start;
  }

  public getEnd(): Coordinate {
    return this.end;
  }
}
