import { readFile, readdir } from "fs/promises";

import { make } from "./make-html.js";

const DATA_DIR = "./data";

async function main() {
  await make();
}

main().catch((err) => console.error(err));
