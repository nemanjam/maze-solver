import fs from 'fs';
import { Maze } from '../maze';
import { Coordinate, IMaze } from '../types/maze';

/**
 * Loads a maze from a file.
 * @param filePath The path to the maze file.
 * @returns A Maze object created from the file data.
 */
export function loadMazeFromFile(filePath: string): IMaze {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const lines = fileContent.split('\n').filter((line) => line.trim() !== '');
  const board: number[][] = [];

  let start: Coordinate | null = null;
  let end: Coordinate | null = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('Start:')) {
      const [x, y] = trimmedLine.replace('Start:', '').split(',').map(Number);
      start = { x, y };
    } else if (trimmedLine.startsWith('End:')) {
      const [x, y] = trimmedLine.replace('End:', '').split(',').map(Number);
      end = { x, y };
    } else {
      // Parse maze row
      const row = trimmedLine.split(' ').map(Number);
      board.push(row);
    }
  });

  if (!start || !end) {
    throw new Error('Start or End coordinates are missing in the file.');
  }

  return Maze.create(board, start, end);
}
