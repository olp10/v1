import { join } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import { mkdir, mkdirSync } from 'fs';

const DATA_DIR = "./data";
const OUTPUT_DIR= './dist';
let filesInFolder = [];


// Klárt fall til að athuga hvort mappa sé til
async function direxists(dir) {
  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    return false;
  }
}


async function main() {
  const files = await readdir(DATA_DIR);

  if (!(await direxists(OUTPUT_DIR))) {
    await mkdirSync(OUTPUT_DIR);
  }
  
  for (const file of files) {
    const path = join(DATA_DIR, file);
    const info = await stat(path);

    if (info.isDirectory()) {
      continue;
    }

    const data = await readFile(path);
    const str = data.toString('utf-8');
    filesInFolder.push(str);
    
  }
  console.log('balsdjkfksd', filesInFolder[2]);
}
main().catch((err) => console.error(err));



// VIRKAR EKKI
async function parse(input) {
  const fileX = await (await readFile(input, "utf-8")).toString().split('\n');
  for (let i = 0; i < fileX.length; i++) {
    if (isNaN(fileX[i]))
      fileX.splice(i, 1);
      console.log(fileX[i]);
    
  }
  console.log(fileX);

}