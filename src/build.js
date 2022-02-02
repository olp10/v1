import { makeHTML } from './make-html.js';

// const DATA_DIR = './data';

async function main() {
  await makeHTML();
}

main().catch((err) => console.error(err));
