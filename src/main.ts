import path from 'path';
import { Maze } from './maze';
import { MazeSolverBFS } from './solvers/maze-solver-bfs';
import { Coordinate, IMaze } from './types/maze';
import { loadMazeFromFile } from './utils/file-loader';
import { MazeSolverDFS } from './solvers/maze-solver-dfs';
import { MazeSolverDijkstra } from './solvers/maze-solver-dijkstra';
import { MazeSolverAStar } from './solvers/maze-solver-a-star';
import { IMazeSolver } from './types/solver';

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
const _maze2: IMaze = Maze.create(testMaze, start, end);

// Load the Maze from the file.
const filePath = path.join(__dirname, '../tests/fixtures/maze-big.txt');
const maze1: IMaze = loadMazeFromFile(filePath);

// Instantiate all algorithm implementations.
const solverBFS: IMazeSolver = new MazeSolverBFS(maze1);
const solverDFS: IMazeSolver = new MazeSolverDFS(maze1);
const solverDijkstra: IMazeSolver = new MazeSolverDijkstra(maze1);
const solverAStar: IMazeSolver = new MazeSolverAStar(maze1);

// Solve the maze using each algorithm and obtain the formatted results.
const resultBFS = solverBFS.solveAndFormat();
const resultDFS = solverDFS.solveAndFormat();
const resultDijkstra = solverDijkstra.solveAndFormat();
const resultAStar = solverAStar.solveAndFormat();

// Print the formatted results from each solver to the console.
console.log(resultBFS.formattedResult);
console.log(resultDFS.formattedResult);
console.log(resultDijkstra.formattedResult);
console.log(resultAStar.formattedResult);
