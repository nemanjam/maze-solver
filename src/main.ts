// import { greet } from './hello-world';

import path from 'path';
import { Maze } from './maze';
import { MazeSolverBFS } from './solvers/maze-solver-bfs';
import { Coordinate, IMaze } from './types/maze';
import { loadMazeFromFile } from './utils/file-loader';
import { MazeSolverDFS } from './solvers/maze-solver-dfs';
import { MazeSolverDijkstra } from './solvers/maze-solver-dijkstra';

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
const maze: IMaze = Maze.create(testMaze, start, end, true);

const filePath = path.join(__dirname, '../tests/fixtures/maze-big.txt');
const maze1: IMaze = loadMazeFromFile(filePath);

const solver1 = new MazeSolverBFS(maze1);
const solver2 = new MazeSolverDFS(maze1);
const solver3 = new MazeSolverDijkstra(maze1);

const foundPath = solver3.solve();
console.log(foundPath);
