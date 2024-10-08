import { greet } from '../src/utils/hello-world';

describe('test greet function', () => {
  it('should return `Hello World!`', () => {
    const result = greet();
    expect(result).toBe('Hello World!');
  });
});
