import { greet } from '../src/index';

describe('greet', () => {
  it('should return a greeting with the provided name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });
});