// test/solvers/maze-solver-dfs.test.ts
import { Maze } from '../src/maze';
import { IMaze } from '../src/types/maze';
import { MazeSolverDFS } from '../src/solvers/maze-solver-dfs';
import { IMazeSolver } from '../src/types/solver';

describe('MazeSolverDFS', () => {
  it('should solve an easy maze', () => {
    const maze: IMaze = Maze.create(
      [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      { x: 0, y: 0 },
      { x: 4, y: 4 }
    );
    const solver: IMazeSolver = new MazeSolverDFS(maze);
    const solution = solver.solve();

    expect(solution).toContain('P'); // Ensure that solution path exists
    console.log(solution); // Log solution to visually inspect the path
  });

  it('should return "No path found" for unsolvable maze', () => {
    const maze = Maze.create(
      [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 0],
      ],
      { x: 0, y: 0 },
      { x: 2, y: 2 }
    );
    const solver: IMazeSolver = new MazeSolverDFS(maze);
    const solution = solver.solve();

    expect(solution).toBe('No path found');
  });
});
