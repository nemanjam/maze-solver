import { greet } from '../src/utils/hello-world';

describe('test greet function', () => {
  it('should return `Hello World!`', () => {
    expect(greet()).toBe('Hello World!');
  });
});
