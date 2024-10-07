import { Coordinate, IMaze } from '../types/maze';
import { IMazeSolver } from '../types/solver';

export abstract class MazeSolver implements IMazeSolver {
  protected maze: IMaze;

  constructor(maze: IMaze) {
    this.maze = maze;
  }

  protected abstract findPath(): null | Coordinate[];

  public solve(): string {
    const path = this.findPath();
    if (!path) {
      return 'No path found';
    }
    return this.maze.formatPath(path);
  }
}
