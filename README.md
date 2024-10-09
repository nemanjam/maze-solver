# Maze solver

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
