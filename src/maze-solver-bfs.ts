import { Coordinate } from './types';
import { MazeSolver } from './maze-solver';

export class MazeSolverBFS extends MazeSolver {
  protected findPath(): null | Coordinate[] {
    const start = this.maze['start'];
    const end = this.maze['end'];

    const directions = [
      { x: 0, y: 1 }, // right
      { x: 1, y: 0 }, // down
      { x: 0, y: -1 }, // left
      { x: -1, y: 0 }, // up
    ];

    const queue: { coord: Coordinate; path: Coordinate[] }[] = [
      { coord: start, path: [start] },
    ];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      const { coord, path } = queue.shift()!;

      if (this.maze.isEnd(coord)) {
        return path;
      }

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
          queue.push({ coord: nextCoord, path: [...path, nextCoord] });
        }
      }
    }

    return null;
  }
}
