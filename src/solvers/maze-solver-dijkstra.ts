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

    // Visited Set here is used just for logging. Dijkstra can revisit nodes.
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    // Start node has no cost - zero.
    const costMap = new Map<string, number>();
    costMap.set(`${start.x},${start.y}`, 0);

    while (queue.length > 0) {
      this.incrementStep();

      // Sort queue by the cost to simulate priority queue behavior.
      queue.sort((a, b) => a.cost - b.cost);

      // For weights (cost) 1 and Infinity (constant weights) completely equivalent to BFS.
      // Priority queue sorted by lowest cost ensures that the top element
      // for the currently cheapest path will be used for the next test.
      const { coord, path, cost } = queue.shift()!;

      if (this.maze.isEnd(coord)) {
        return path;
      }

      // Print the current state of the maze.
      this.printBoard(coord, visited, path);

      for (const direction of directions) {
        const nextCoord: Coordinate = {
          x: coord.x + direction.x,
          y: coord.y + direction.y,
        };

        const coordKey = `${nextCoord.x},${nextCoord.y}`;
        // Add history and current cost. Guaranteed to find path with the lowest cost.
        // Can handle weighted graphs.
        const nextCost = cost + this.maze.getCost(nextCoord);

        if (
          this.maze.isWithinBounds(nextCoord) &&
          this.maze.isWalkable(nextCoord) &&
          // First time visited or within this path the cost is lower than the cost from some previous path.
          // The second condition handles multiple paths to the same node. So it can choose the cheapest path.
          (!costMap.has(coordKey) || nextCost < costMap.get(coordKey)!)
        ) {
          visited.add(coordKey); // Only for logging.
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
