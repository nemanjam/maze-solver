import { Coordinate } from '../types/maze';
import { DFSStackElement } from '../types/solver';
import { directions } from '../utils/constants';
import { MazeSolver } from './maze-solver';

export class MazeSolverDFS extends MazeSolver {
  /**
   * Implements the Depth-First Search (DFS) algorithm to find a path from the start to the end of the maze.
   */
  protected findPath(): Coordinate[] | null {
    const start = this.maze.getStart();

    const stack: DFSStackElement[] = [{ coord: start, path: [start] }];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (stack.length > 0) {
      this.incrementStep();

      /**
       *
       * The most important line. The only difference from BFS.
       * LIFO - Takes the newest element from the stack.
       *
       * It will try to keep the same direction with priority from the directions array.
       * Without walls and bounds it would run in straight line.
       *
       * Example for top, right, down, left.
       *  4
       *  3
       *  2
       *  1
       *
       * Mutates the stack. coord is current element.
       *
       */
      const { coord, path } = stack.pop()!;

      if (this.maze.isEnd(coord)) {
        return path;
      }

      // Print the current state of the maze.
      this.printBoard(coord, visited, path);

      // Completely same as BFS.
      for (const direction of directions) {
        const nextCoord: Coordinate = {
          x: coord.x + direction.x,
          y: coord.y + direction.y,
        };

        const coordKey = `${nextCoord.x},${nextCoord.y}`;
        if (
          !visited.has(coordKey) &&
          this.maze.isWithinBounds(nextCoord) &&
          this.maze.isWalkable(nextCoord)
        ) {
          visited.add(coordKey);
          stack.push({ coord: nextCoord, path: [...path, nextCoord] });
        }
      }
    }

    return null;
  }
}
