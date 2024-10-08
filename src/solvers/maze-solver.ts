import { Coordinate, IMaze } from '../types/maze';
import { IMazeSolver, FormattedResult } from '../types/solver';
import { cells } from '../utils/colors';
import { CONFIG } from '../config';

export abstract class MazeSolver implements IMazeSolver {
  protected maze: IMaze;
  private step = 0;
  private enableLogging: boolean;

  constructor(maze: IMaze, enableLogging = CONFIG.enableLogging) {
    this.maze = maze;
    // Disable logging for tests.
    this.enableLogging =
      process.env.NODE_ENV === 'test' ? false : enableLogging;
  }

  protected abstract findPath(): Coordinate[] | null;

  protected incrementStep(): void {
    this.step++;
  }

  private resetStep(): void {
    this.step = 0;
  }

  public solve(): string {
    this.resetStep();

    const path = this.findPath();
    if (!path) {
      return 'No path found';
    }
    return this.maze.formatPath(path);
  }

  public solveAndFormat(): FormattedResult {
    const path = this.solve();

    return {
      path,
      name: this.constructor.name,
      step: this.step,
      formattedResult: `Algorithm: ${this.constructor.name}\nSteps: ${this.step}\nFound path:\n${path}\n`,
    };
  }

  protected printBoard(
    current: Coordinate,
    visited: Set<string>,
    currentPath: Coordinate[]
  ): void {
    if (!this.enableLogging) {
      return;
    }

    // Create a copy of the board to modify for display
    const displayBoard: string[][] = this.maze
      .getBoard()
      .map((row) => [...row.map((cell) => String(cell))]);

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

    const output = `Step ${this.step}:\n${displayBoard
      .map((row) => row.join(' '))
      .join('\n')}\n`;
    console.log(output);
  }
}
