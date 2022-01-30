/* eslint-disable no-await-in-loop */
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getCalculations } from './parser.js';
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
export async function makeDataPage() {
    const page = await getData();
    let template = '';
    for (const data of page) {
      const filename = join(OUTPUT_DIR, `${data.title}.html`);
      try {

        // eslint-disable-next-line no-await-in-loop
        const calc = await getCalculations(data);
        // eslint-disable-next-line no-await-in-loop
        // console.info(await getCalculations(test));

        template = `
        <!DOCTYPE html>
        <head>
          <title>${data.title}</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
        <div class="grid">
        <h1>${data.title}</h1>
          <div class="row">
            <div class="col col-12">
              <p>Max: ${calc.calculations.max}</p>
              <p>Mean: ${calc.calculations.mean}</p>
              <p>Median: ${calc.calculations.median}</p>
              <p>Min: ${calc.calculations.min}</p>
              <p>Sum: ${calc.calculations.sum}</p>
              <p>Range: ${calc.calculations.range}</p>
            </div>
          </div>
        </div>
        </body>
        `;

        // eslint-disable-next-line no-await-in-loop
        await writeFile(filename, template);
      } catch(e) {
        template = `
        <!DOCTYPE html>
        <head>
          <title>${data.title}</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
        <div class="grid">
        <h1>${data.title}</h1>
          <div class="row">
            <div class="col col-12">
              <h1>Engin gögn voru í skránni</h1>
            </div>
          </div>
        </div>
        </body>
        `;

        await writeFile(filename, template);
        console.warn('blabla');
    }
  }
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
  await makeDataPage();
  await writeFile(filename, index);
}



