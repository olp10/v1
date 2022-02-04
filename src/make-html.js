/* eslint-disable no-await-in-loop */
import { readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { getCalculations } from './parser.js';
import { getData } from './read-files.js';

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

/**
 *
 * @param {string} data template for files
 * @returns {string} a template
 */
export async function makeIndex(data) {
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


export async function makeDataPage() {
    const files = await readdir(DATA_DIR);
    const page = await getData(files);
    let template = '';


    for (const data of page) {
      const filename = join(OUTPUT_DIR, `${data.title}.html`);

      let dataSet = '<h2>Parsed Data:</h2><table class="data">';
      for (let i = 0; i < data.nums.length; i += 1) {
        dataSet += `<tr><td>${data.nums[i]}</td></tr>`
      }
      dataSet += '</table>'


      try {
        const calc = await getCalculations(data);
        template = `
        <!DOCTYPE html>
        <head>
          <title>${data.title}</title>
          <link rel="stylesheet" href="styles.css" />
        </head>
        <body>
        <div class="grid">
        <h1>${data.title}</h1>
              <table>
                <tr class="calc head">
                  <th>Calculation</th>
                  <th>Result</th>
                </tr>
                <tr>
                  <td class="calc">Max</td>
                  <td>${calc.calculations.max}</td>
                </tr>
                <tr>
                <td class="calc">Mean</td>
                  <td>${calc.calculations.mean}</td>
                </tr>
                <tr>
                <td class="calc">Median</td>
                  <td>${calc.calculations.median}</td>
                </tr>
                <tr>
                <td class="calc">Min</td>
                  <td>${calc.calculations.min}</td>
                </tr>
                <tr>
                <td class="calc">Sum</td>
                  <td>${calc.calculations.sum}</td>
                </tr>
                <tr>
                <td class="calc">Range</td>
                  <td>${calc.calculations.range}</td>
                </tr>
              </table>
            <div class="row">
              <a href="../dist/index.html">Til baka á forsíðu</a>
            </div>
            ${dataSet}
          </div>
        </body>
        `;

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
          <div class="row">
            <a href="../dist/index.html">Til baka á forsíðu</a>
          </div>
        </div>
        </body>
        `;

        await writeFile(filename, template);
    }
  }
}

/**
 *
 * @returns {string}
 */
export async function makeDataset() {
  // eslint-disable-next-line quotes
  let cardsTemplate = ``;
  const files = await readdir(DATA_DIR);
  const data = await getData(files);
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

export async function makeHTML() {
  const filename = join(OUTPUT_DIR, '/index.html');
  const data = await makeDataset();
  const index = await makeIndex(data);
  await makeDataPage();
  await writeFile(filename, index);
}



