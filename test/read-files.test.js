import { describe, expect, it } from '@jest/globals';

describe.skip('html', () => {
  it.only('makes html', () => {
    expect(5).toBe(5);
  });
});
