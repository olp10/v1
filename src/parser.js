import { parse } from 'number-parsing';
import { getData } from './read-files.js';

export async function parseFile(input) {
  const x = parse;
  return x(input);
}

async function main() {
  parseFile(123.2);
}