import { greet } from '../src/hello-world';

describe('test greet function', () => {
  it('should return `Hello World!`', () => {
    expect(greet()).toBe('Hello World!');
  });
});
