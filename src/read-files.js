import { join } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import { mkdirSync } from 'fs';

const DATA_DIR = "./data";
const OUTPUT_DIR= './dist';

// Klárt fall til að athuga hvort mappa sé til
async function direxists(dir) {
  try {
    const info = await stat(dir);
    return info.isDirectory();
  } catch (e) {
    return false;
  }
}


/**
 * 
 * @returns object with title and an array with supposed numbers
 */
export async function getData() {
  // Lesa skráarnöfn úr möppu
  const files = await readdir(DATA_DIR);
  let filesInFolder = [];

  // búa til ./dist ef ekki til nú þegar
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdirSync(OUTPUT_DIR);
  }
  
  // Búa til object með skráarnafni og array með tölum sem þarf að parsa seinna
  for (const file of files) {
    const path = join(DATA_DIR, file);
    const info = await stat(path);

    // Gera ekkert ef "skráin" er mappa
    if (info.isDirectory()) {
      continue;
    }

    const data = await readFile(path);
    const str = data.toString('utf-8');
    let results = {
      title: file,
      nums: str.split('\n')
    }
    filesInFolder.push(results);
  }
  return filesInFolder;
}