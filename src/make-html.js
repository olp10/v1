import { writeFile } from "fs/promises";
import { join } from "path";
import { getData } from "./read-files.js";

const OUTPUT_DIR = "./dist";

/**
 * 
 * @param {string} data template for files
 * @returns {string} a template 
 */
async function makeIndex(data) {
  const title = "Gagnavinnsla";
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
async function makeDataPage(data) {
  const title = await getData();
  const template = `
  <!DOCTYPE html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    ${data}
  </body>
  `
}

// Komin virkni til að búa til cols fyrir hvert gagnasett, þarf að laga fyrir
// Síðustu, jafnvel bæta fyrir responsive ef tími gefst

/**
 * 
 * @returns {string}
 */
async function makeDataset() {
  let cardsTemplate = ``;
  const data = await getData();
  for (let i = 0; i < data.length; i++) {
    const datasetTitle = await data[i].title;
    const path = `${datasetTitle}.html`;
    // Ný röð
    if (i % 3 == 0) {
      cardsTemplate += `
      <div class="row">
      `;
    }
    cardsTemplate += `
    <div class="col col-4 col-md-2 col-sm-1">
      <div class="cardholder"><a href="${path}"><div class="card">${datasetTitle}</div></a></div>
    </div>
    `;

    // Loka röð
    if ((i + 1) % 3 == 0) {
      cardsTemplate += `
      </div>
      `;
    }
  }
  return cardsTemplate;
}

export async function make() {
  const filename = join(OUTPUT_DIR, "/index.html");
  const data = await makeDataset();
  const index = await makeIndex(data);
  await writeFile(filename, index);
}
