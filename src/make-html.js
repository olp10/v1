import { writeFileSync } from 'fs';
import { join } from 'path';
import { getData } from './read-files.js';

const data = getData();
const OUTPUT_DIR = './dist';

// Búa til <ul> lista af skráarnöfnum með link á þær
export async function makeIndex() {
  const dataset = await makeDataset();
  const title = 'Gagnavinnsla';
  const template = `
  <!DOCTYPE html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
  ${dataset}
  </body>
  `;

  return template;
}

// TODO
// Komin virkni til að búa til cols fyrir hvert gagnasett, þarf að laga fyrir
// Síðustu, jafnvel bæta fyrir responsive ef tími gefst

export async function makeDataset() {
  let cardTitle = ``;
  const data = await getData();
  for(let i = 0; i < data.length; i++) {
    const titler = await data[i].title;
    // Ný röð
    if (i % 3 == 0) {
      cardTitle += `
      <div class="row">
      `;
    }
    cardTitle += `
    <div class="col col-4">
      <h2>${titler}</h2> 
    </div>
    `;

    // Loka röð
    if ((i+1) % 3 == 0) {
      cardTitle += `
      </div>
      `;
    }
  }
  return cardTitle;
}


export async function make() {
  const filename = join(OUTPUT_DIR, '/index.html');
  const x = await makeIndex();
  await writeFileSync(filename, x);
} 