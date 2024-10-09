# Maze solver

## Requirements

- Maze representation and path finding
- Implement multiple solvers
- Automated tests
- Read mazes from input files

## Installation and running

```bash
# install dependencies
yarn install

# run in dev mode
# enable or disable logging in src/config.ts
yarn dev

# logging is disabled for tests by default

# run tests
yarn test

# run tests in verbose mode
yarn test-verbose

# generate coverage report
yarn coverage
```

## Screenshots

### Development

![Development](./screenshots/yarn-dev.png)

### Development with logging enabled

![Development with logging enabled](./screenshots/yarn-dev-enable-logging.png)

#### Logging legend

Defined in `src/utils/colors.ts`.

- red `*` - current path
- magenta `+` - current cell
- blue `0` - visited cell

![Logging legend](./screenshots/logging-legend.png)

### Test verbose

![Test verbose](./screenshots/yarn-test-verbose.png)

### Coverage

![Coverage](./screenshots/yarn-coverage.png)

## Architecture

## Algorithms

## References

- Starter project, Typescript, Jest https://github.com/julianmateu/hello-ts
- Some visualized algorithms behavior https://www.youtube.com/watch?v=GC-nBgi9r0U
- BFS vs DFS, basic overview and implementation https://www.geeksforgeeks.org/difference-between-bfs-and-dfs/
- BFS vs Dijkstra similarities https://stackoverflow.com/a/52676408/4383275
- Visual playgrounds https://visualmazesolver.vercel.app/, http://qiao.github.io/PathFinding.js/visual/
