import { Coordinate, IMaze } from '../types/maze';
import { IMazeSolver, PrintResult } from '../types/solver';

export abstract class MazeSolver implements IMazeSolver {
  protected maze: IMaze;
  private step = 1;

  constructor(maze: IMaze) {
    this.maze = maze;
  }

  protected abstract findPath(): Coordinate[] | null;

  public solve(): string {
    this.resetStep();

    const path = this.findPath();
    if (!path) {
      return 'No path found';
    }
    return this.maze.formatPath(path);
  }

  public printResult(): PrintResult {
    const path = this.solve();

    return {
      path,
      name: this.constructor.name,
      step: this.step,
      formattedResult: `Algorithm: ${this.constructor.name}\nSteps: ${this.step}\nFound path:\n${path}\n`,
    };
  }

  protected incrementStep(): void {
    this.step++;
  }

  protected getStep(): number {
    return this.step;
  }

  private resetStep(): void {
    this.step = 1;
  }
}
