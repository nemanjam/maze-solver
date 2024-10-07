import { MazeSolver } from './maze-solver';
import { Coordinate } from '../types/maze';
import { DijkstraQueueElement } from '../types/solver';
import { directions } from '../utils/constants';

export class MazeSolverDijkstra extends MazeSolver {
  protected findPath(): Coordinate[] | null {
    const start = this.maze.getStart();

    const queue: DijkstraQueueElement[] = [
      { coord: start, path: [start], cost: 0 },
    ];

    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    const costMap = new Map<string, number>();
    costMap.set(`${start.x},${start.y}`, 0);

    while (queue.length > 0) {
      this.incrementStep();

      // Sort queue by the cost to simulate priority queue behavior
      queue.sort((a, b) => a.cost - b.cost);
      const { coord, path, cost } = queue.shift()!;

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
        const nextCost = cost + this.maze.getCost(nextCoord);

        if (
          this.maze.isWithinBounds(nextCoord) &&
          this.maze.isWalkable(nextCoord) &&
          (!costMap.has(coordKey) || nextCost < costMap.get(coordKey)!)
        ) {
          visited.add(coordKey);
          costMap.set(coordKey, nextCost);
          queue.push({
            coord: nextCoord,
            path: [...path, nextCoord],
            cost: nextCost,
          });
        }
      }
    }

    return null;
  }
}
