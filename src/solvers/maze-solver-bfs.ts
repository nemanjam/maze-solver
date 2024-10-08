import { Coordinate } from '../types/maze';
import { BFSQueueElement } from '../types/solver';
import { directions } from '../utils/constants';
import { MazeSolver } from './maze-solver';

export class MazeSolverBFS extends MazeSolver {
  /**
   * Implements the Breadth-First Search (BFS) algorithm to find a path from the start to the end of the maze.
   */
  protected findPath(): Coordinate[] | null {
    const start = this.maze.getStart();

    // Initialize the BFS queue with the start position.
    const queue: BFSQueueElement[] = [{ coord: start, path: [start] }];

    // Keep track of visited coordinates (as strings).
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y}`);

    while (queue.length > 0) {
      // Count iterations.
      this.incrementStep();

      /**
       *
       * The most important line. Determines how it will choose the next element for test.
       * FIFO - Takes the oldest element in the queue.
       *
       * It will try to change direction in each iteration. Same direction has the lowest priority.
       * Without walls and bounds it would run in circle, because the for loop bellow loops directions in circle.
       *
       * Example for top, right, down, left.
       *   6
       * 7 2 8
       * 5 1 3 9
       *   4
       *
       * Keeps the current path snapshot for each element in the path, takes up a lot of memory.
       *
       * Mutates the queue. coord is current element.
       *
       */
      const { coord, path } = queue.shift()!;

      // Check if end and exit.
      if (this.maze.isEnd(coord)) {
        return path;
      }

      // Print the current state of the maze.
      this.printBoard(coord, visited, path);

      // Always loops 4 times.
      for (const direction of directions) {
        // Calculate the next coordinate by applying the direction.
        const nextCoord: Coordinate = {
          x: coord.x + direction.x,
          y: coord.y + direction.y,
        };
        // Create a key for nextCoord (to check for uniqueness in the visited set).
        const coordKey = `${nextCoord.x},${nextCoord.y}`;

        // If nextCoord is not visited, is within bounds, and is walkable, add it to the potential path.
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

    // Return null if no path to the end is found.
    return null;
  }
}
