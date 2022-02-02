import { describe, expect, it } from '@jest/globals';
import { parse } from '../src/parser.js';


async function test() {
  try {
    const x = await parse([5, 2, 3]);
    return x;
  } catch(e) {
    console.info('ERROR');
    return '';
  }
}


describe('Parser', () => {
  it.only('parses a file', () => {
    expect(test()).toBe([5, 2, 3]);
  });
});
