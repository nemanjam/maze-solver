import { Maze } from '../src/maze';
import { Coordinate } from '../src/types/maze';

describe('Maze', () => {
  const board: number[][] = [
    [0, 1, 0],
    [0, 0, 0],
    [1, 1, 0],
  ];

  const start: Coordinate = { x: 0, y: 0 };
  const end: Coordinate = { x: 2, y: 2 };

  it('should create a new Maze instance', () => {
    const maze = Maze.create(board, start, end);
    expect(maze).toBeInstanceOf(Maze);
  });

  it('should return true if a coordinate is within bounds', () => {
    const maze = Maze.create(board, start, end);
    expect(maze.isWithinBounds({ x: 1, y: 1 })).toBe(true);
    expect(maze.isWithinBounds({ x: -1, y: 0 })).toBe(false);
    expect(maze.isWithinBounds({ x: 2, y: 3 })).toBe(false);
  });

  it('should return true if a coordinate is walkable', () => {
    const maze = Maze.create(board, start, end);
    expect(maze.isWalkable({ x: 0, y: 0 })).toBe(true);
    expect(maze.isWalkable({ x: 0, y: 1 })).toBe(false);
    expect(maze.isWalkable({ x: 2, y: 2 })).toBe(true);
  });

  it('should return true if a coordinate is the end of the maze', () => {
    const maze = Maze.create(board, start, end);
    expect(maze.isEnd({ x: 2, y: 2 })).toBe(true);
    expect(maze.isEnd({ x: 1, y: 1 })).toBe(false);
  });

  it('should correctly format the maze path', () => {
    const maze = Maze.create(board, start, end);
    const path: Coordinate[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ];
    const formatted = maze.formatPath(path);
    expect(formatted).toBe('P # .\nP P P\n# # P');
  });
});
