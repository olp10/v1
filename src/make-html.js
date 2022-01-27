// import { addResultsToArray } from './read-files.js';

export function makeHTML(entry) {
  const results = addResultsToArray(entry);
  const template = `
  <!DOCTYPE html>
  <html>
    <head>
        <title>${results.metadata.title}</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <section>
            HTML
            <p>Skrifað: DATE</p>
        </section>
    </body>
  `
  return "";
}


// Búa til ul lista af skráarnöfnum með link á þær
export function makeIndex(entries) {
  const dataset = makeDataset(/* Read-files, fylki af nöfnum á skránnum */)
  const template = `
  <!DOCTYPE html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
  ${dataset}
  `;


  let list = '';
  for (const entry in entries) {
    const link = `<li><a href=""></a></li>`;
  }
  return `<ul>${list}</ul>`;
}

export function makeDataset(title = []) {
  let cardTitle = ``;
  for(let i = 0; i < title.length; i++) {
    // Ný röð
    if (i % 3 == 0) {
      cardTitle += `
      <div class="row">
      `;
    }
    cardTitle += `
    <div class="col col-4">
      <h2>${title[i]}</h2>
    </div>
    `;

    // Loka röð
    if (i % 3 == 0) {
      cardTitle += `
      </div>
      `;
    }
  }
  return cardTitle;
}

export function entryTemplate() {
  return '';
}