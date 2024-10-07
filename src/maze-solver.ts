import { Coordinate } from './types';
import { Maze } from './maze';

export abstract class MazeSolver {
  protected maze: Maze;

  constructor(maze: Maze) {
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
