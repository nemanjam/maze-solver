import { Coordinate, IMaze } from '../types/maze';
import { IMazeSolver, FormattedResult } from '../types/solver';
import { cells } from '../utils/colors';
import { CONFIG } from '../config';

/**
 * Abstract base class for maze solving algorithms.
 * Implements common functionality for maze solvers.
 */
export abstract class MazeSolver implements IMazeSolver {
  /** The maze instance that this solver will operate on. */
  protected maze: IMaze;

  /** A counter to track the number of steps taken during the maze-solving process. */
  private step = 0;
  private enableLogging: boolean;

  /**
   * Creates an instance of MazeSolver.
   * @param maze - The maze to be solved.
   * @param enableLogging - Flag to enable or disable logging (default is taken from config).
   */
  constructor(maze: IMaze, enableLogging = CONFIG.enableLogging) {
    this.maze = maze;
    // Disable logging for tests.
    this.enableLogging =
      process.env.NODE_ENV === 'test' ? false : enableLogging;
  }

  /**
   * Abstract method to find the path in the maze.
   * Must be implemented by derived classes.
   * @returns An array of coordinates representing the path, or null if no path is found.
   */
  protected abstract findPath(): Coordinate[] | null;

  /** Increments the step counter for the algorithm. */
  protected incrementStep(): void {
    this.step++;
  }

  /** Resets the step counter to zero. */
  private resetStep(): void {
    this.step = 0;
  }

  /**
   * Solves the maze and returns a formatted string of the path. Used in tests.
   * @returns A string representation of the board and path found, or a message indicating no path was found.
   */
  public solve(): string {
    this.resetStep();

    const path = this.findPath();
    if (!path) {
      return 'No path found';
    }
    return this.maze.formatPath(path);
  }

  /**
   * Solves the maze and returns a human-readable formatted string to be printed in terminal.
   * Includes the additional information: algorithm name, steps taken, and the path.
   * @returns A pretty-printed human-readable formatted string of the board with found path.
   */
  public solveAndFormat(): FormattedResult {
    const path = this.solve();

    return {
      path,
      name: this.constructor.name,
      step: this.step,
      formattedResult: `Algorithm: ${this.constructor.name}\nSteps: ${this.step}\nFound path:\n${path}\n`,
    };
  }

  /**
   * Prints the current state of the maze, including the current position, visited nodes, and the current path.
   * Called in sub-classes.
   */
  protected printBoard(
    current: Coordinate,
    visited: Set<string>,
    currentPath: Coordinate[]
  ): void {
    /** Abort if logging is not enabled in the Config. */
    if (!this.enableLogging) {
      return;
    }

    // Create a stringified copy of the board to modify for display.
    const displayBoard: string[][] = this.maze
      .getBoard()
      .map((row) => [...row.map((cell) => String(cell))]);

    // Mark the current position in the maze.
    displayBoard[current.x][current.y] = cells.current;

    // Mark the path cells, skip the current.
    for (const coord of currentPath) {
      if (displayBoard[coord.x][coord.y] !== cells.current) {
        displayBoard[coord.x][coord.y] = cells.path;
      }
    }

    // Mark the visited cells, skip the current and the path.
    for (const coordKey of visited) {
      const [x, y] = coordKey.split(',').map(Number);
      if (
        displayBoard[x][y] !== cells.path &&
        displayBoard[x][y] !== cells.current
      ) {
        displayBoard[x][y] = cells.visited;
      }
    }

    // Convert the string matrix to string, add step counter and print immediately.
    const output = `Step ${this.step}:\n${displayBoard
      .map((row) => row.join(' '))
      .join('\n')}\n`;
    console.log(output);
  }
}
