import { greet } from '../src/utils/hello-world';

// Smoke test, test that Typescript and Jest configurations are working.
describe('Test greet function', () => {
  it('should return `Hello World!`', () => {
    const result = greet();
    expect(result).toBe('Hello World!');
  });
});
