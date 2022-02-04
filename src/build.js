import { makeHTML } from './make-html.js';

async function main() {
  await makeHTML();
}

main().catch((err) => console.error(err));
