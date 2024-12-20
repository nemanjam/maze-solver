import fs from 'fs';
import { loadMazeFromFile } from '../src/utils/file-loader';
import { Maze } from '../src/maze';
import { IMaze } from '../src/types/maze';

jest.mock('fs');

describe('loadMazeFromFile', () => {
  beforeEach(() => {
    // Mock the readFileSync function
    (fs.readFileSync as jest.Mock) = jest.fn();
  });

  it('should load a maze from a file and return a Maze object', () => {
    const mockFileContent = `
            0 1 0 0 0
            0 1 0 1 0
            0 0 0 1 0
            0 1 1 1 0
            0 0 0 0 0
            Start: 0,0
            End: 4,4
        `;
    (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

    const maze: IMaze = loadMazeFromFile('mockMaze.txt');

    expect(maze).toBeInstanceOf(Maze);
    expect(maze.getStart()).toEqual({ x: 0, y: 0 });
    expect(maze.getEnd()).toEqual({ x: 4, y: 4 });
    expect(maze.getBoard()).toEqual([
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it('should throw an error if the start or end coordinates are missing', () => {
    const incompleteFileContent = `
            0 1 0 0 0
            0 1 0 1 0
            0 0 0 1 0
            0 1 1 1 0
            0 0 0 0 0
        `;
    (fs.readFileSync as jest.Mock).mockReturnValue(incompleteFileContent);

    expect(() => loadMazeFromFile('mockMaze.txt')).toThrow(
      'Start or End coordinates are missing in the file.'
    );
  });
});
