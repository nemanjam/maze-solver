import { greet } from '../src/utils/hello-world';

describe('SmokeTest', () => {
  it('Typescript and Jest configurations are working. `Hello World!`', () => {
    const result = greet();
    expect(result).toBe('Hello World!');
  });
});
