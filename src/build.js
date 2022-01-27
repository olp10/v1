import { readFile, readdir } from "fs/promises";

import { makeHTML } from "./make-html.js";

const DATA_DIR = "./data";

async function main() {
  const files = await readdir(DATA_DIR);
  console.log("files :>> ", files);
}

main().catch((err) => console.error(err));
