import { mkdir, readFile, stat } from 'fs/promises';
import { join } from 'path';
import { parse } from './parser.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';


/**
 *
 * @param {string} dir
 * @returns
 */
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
 * @returns {object} object with title and an array with supposed numbers
 */
export async function getData(dir) {
  // Lesa skráarnöfn úr möppu
  let files = dir;
  files = files.sort();
  console.info(files);
  const filesInFolder = [];

  // búa til ./dist ef ekki til nú þegar
  if (!(await direxists(OUTPUT_DIR))) {
    await mkdir(OUTPUT_DIR);
  }

  // Búa til object með skráarnafni og array með tölum sem þarf að parsa seinna
  for (const file of files) {
    const path = join(DATA_DIR, file);
    // eslint-disable-next-line no-await-in-loop
    const info = await stat(path);

    // Gera ekkert ef "skráin" er mappa
    if (info.isDirectory()) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const data = await readFile(path);
    const str = data.toString('utf-8');
    const results = {
      title: file,
      // eslint-disable-next-line no-await-in-loop
      nums: await parse(str.split('\n'))
    };

    filesInFolder.push(results);
  }

  return filesInFolder;
}
