import { Coordinate } from '../types/maze';
import { DFSStackElement } from '../types/solver';
import { directions } from '../utils/constants';
import { MazeSolver } from './maze-solver';

export class MazeSolverDFS extends MazeSolver {
  protected findPath(): Coordinate[] | null {
    const start = this.maze.getStart();

    const stack: DFSStackElement[] = [{ coord: start, path: [start] }];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (stack.length > 0) {
      this.incrementStep();

      const { coord, path } = stack.pop()!;

      if (this.maze.isEnd(coord)) {
        return path;
      }

      // Print the current state of the maze
      this.maze.printBoard(coord, visited, path, this.getStep());

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
