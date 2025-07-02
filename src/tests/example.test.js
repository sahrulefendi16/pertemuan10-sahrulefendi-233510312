// src/tests/example.test.js
// Make sure to import these if you haven't set `globals: true` in vite.config.js
import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  // You can add more tests here
  it('adds 1 + 1 to equal 2', () => {
    expect(1 + 1).toBe(2);
  });
});