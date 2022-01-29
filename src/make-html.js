import { writeFile } from 'fs/promises';
import { join } from 'path';
// import { getFileData } from './parser.js';
import { getData } from './read-files.js';

const OUTPUT_DIR = './dist';

/**
 *
 * @param {string} data template for files
 * @returns {string} a template
 */
async function makeIndex(data) {
  const title = 'Gagnavinnsla';
  const template = `
  <!DOCTYPE html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="grid">
      <h1>${title}</h1>
      ${data}
    </div>
  </body>
  `;
  return template;
}

// TODO
// Koma gögnum á sér síðu
export async function makeDataPage(data) {
  const title = await getData();

  for (const site of data) {
    console.info(site.title);
  }

  const template = `
  <!DOCTYPE html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    ${data}
  </body>
  `;
  return template;
}

// Komin virkni til að búa til cols fyrir hvert gagnasett, þarf að laga fyrir
// Síðustu, jafnvel bæta fyrir responsive ef tími gefst

/**
 *
 * @returns {string}
 */
async function makeDataset() {
  // eslint-disable-next-line quotes
  let cardsTemplate = ``;
  const data = await getData();
  for (let i = 0; i < data.length; i += 1) {
    const datasetTitle = data[i].title;
    const path = `${datasetTitle}.html`;
    // Ný röð
    if (i % 3 === 0) {
      cardsTemplate += `
      <div class="row">
      `;
    }
    cardsTemplate += `
    <div class="col col-4">
      <div class="cardholder"><a href="${path}"><div class="card">${datasetTitle}</div></a></div>
    </div>
    `;

    // Loka röð
    if ((i + 1) % 3 === 0) {
      cardsTemplate += `
      </div>
      `;
    }
  }
  return cardsTemplate;
}

export async function make() {
  const filename = join(OUTPUT_DIR, '/index.html');
  const data = await makeDataset();
  const index = await makeIndex(data);
  await writeFile(filename, index);
}
