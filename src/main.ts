// import { greet } from './hello-world';

import path from 'path';
import { Maze } from './maze';
import { MazeSolverBFS } from './maze-solver-bfs';
import { Coordinate } from './types';
import { loadMazeFromFile } from './file-loader';

// let message: string = greet();
// console.log(message);

const testMaze: number[][] = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];

const start: Coordinate = { x: 0, y: 0 };
const end: Coordinate = { x: 4, y: 4 };
const maze = Maze.create(testMaze, start, end);

const filePath = path.join(__dirname, '../tests/fixtures/maze-big.txt');
const maze1 = loadMazeFromFile(filePath);

const solver = new MazeSolverBFS(maze1);

console.log(solver.solve());
