// import { greet } from './hello-world';

import path from 'path';
import { Maze } from './maze';
import { MazeSolverBFS } from './solvers/maze-solver-bfs';
import { Coordinate, IMaze } from './types/maze';
import { loadMazeFromFile } from './utils/file-loader';
import { MazeSolverDFS } from './solvers/maze-solver-dfs';
import { MazeSolverDijkstra } from './solvers/maze-solver-dijkstra';
import { MazeSolverAStar } from './solvers/maze-solver-a-star';
import { IMazeSolver } from './types/solver';

// let message: string = greet();
// console.log(message);

// Load Maze from code.
const testMaze: number[][] = [
  [0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
];

const start: Coordinate = { x: 0, y: 0 };
const end: Coordinate = { x: 4, y: 4 };
const maze2: IMaze = Maze.create(testMaze, start, end);

// Load Maze from file.
const filePath = path.join(__dirname, '../tests/fixtures/maze-big.txt');
const maze1: IMaze = loadMazeFromFile(filePath);

// Instantiate all algorithm implementations and print formatted results.
const solver1: IMazeSolver = new MazeSolverBFS(maze1);
const solver2: IMazeSolver = new MazeSolverDFS(maze1);
const solver3: IMazeSolver = new MazeSolverDijkstra(maze1);
const solver4: IMazeSolver = new MazeSolverAStar(maze1);

const result1 = solver1.solveAndFormat();
const result2 = solver2.solveAndFormat();
const result3 = solver3.solveAndFormat();
const result4 = solver4.solveAndFormat();

console.log(result1.formattedResult);
console.log(result2.formattedResult);
console.log(result3.formattedResult);
console.log(result4.formattedResult);
