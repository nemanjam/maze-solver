import { Maze } from '../src/maze';
import { MazeSolverBFS } from '../src/maze-solver-bfs';
import { Coordinate } from '../src/types';

describe('MazeSolverBFS', () => {
  const board: number[][] = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];

  const start: Coordinate = { x: 0, y: 0 };
  const end: Coordinate = { x: 2, y: 2 };

  it('should solve the maze and find a valid path', () => {
    const maze = Maze.create(board, start, end);
    const solver = new MazeSolverBFS(maze);
    const result = solver.solve();
    expect(result).toBe('P # .\nP # .\nP P P');
  });

  it('should return "No path found" when no path exists', () => {
    const noPathBoard: number[][] = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const maze = Maze.create(noPathBoard, start, end);
    const solver = new MazeSolverBFS(maze);
    const result = solver.solve();
    expect(result).toBe('No path found');
  });

  it('should find the shortest path using BFS', () => {
    const maze = Maze.create(board, start, end);
    const solver = new MazeSolverBFS(maze);
    const path = solver['findPath'](); // Access the private method for testing purposes.
    expect(path).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  });
});
