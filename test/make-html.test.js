import { describe, expect, it } from '@jest/globals';
import { makeIndex } from '../src/make-html.js';


describe('html', () => {
  it('makes the index page', async () => {
    const test = 'test';
    expect (await makeIndex(test)).toBe(
  `
  <!DOCTYPE html>
  <head>
    <title>Gagnavinnsla</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="grid">
      <h1>Gagnavinnsla</h1>
      ${test}
    </div>
  </body>
  `
    );
  });
});
