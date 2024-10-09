import { MazeSolver } from './maze-solver';
import { Coordinate } from '../types/maze';
import { DijkstraQueueElement } from '../types/solver';
import { directions } from '../utils/constants';

export class MazeSolverAStar extends MazeSolver {
  protected heuristic(a: Coordinate, b: Coordinate): number {
    // Manhattan distance as the heuristic.
    // Can only move horizontally or vertically, not diagonally. In "rectangles".
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  protected findPath(): Coordinate[] | null {
    const start = this.maze.getStart();
    const end = this.maze.getEnd();

    const openSet: DijkstraQueueElement[] = [
      { coord: start, path: [start], cost: 0 },
    ];

    // Visited Set here is used just for logging. A* can revisit nodes.
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    const costMap = new Map<string, number>();
    costMap.set(`${start.x},${start.y}`, 0);

    while (openSet.length > 0) {
      this.incrementStep();

      // Sort by total cost (actual cost + heuristic).
      // When deciding the next element (sorting by cost) takes into account history (like Dijkstra)
      // but also the future (heuristic) assumption.
      openSet.sort(
        (a, b) =>
          // The most important line. The only difference from Dijkstra.
          // Cost = history + Manhattan distance from the end node.
          // prettier-ignore
          (a.cost + this.heuristic(a.coord, end)) -
          (b.cost + this.heuristic(b.coord, end))
      );
      const { coord, path, cost } = openSet.shift()!;

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
        const nextCost = cost + this.maze.getCost(nextCoord);

        if (
          this.maze.isWithinBounds(nextCoord) &&
          this.maze.isWalkable(nextCoord) &&
          (!costMap.has(coordKey) || nextCost < costMap.get(coordKey)!)
        ) {
          visited.add(coordKey); // Only for logging.
          costMap.set(coordKey, nextCost);
          openSet.push({
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
