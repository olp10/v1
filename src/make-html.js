import { addResultsToArray } from './read-files.js';

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
  let list = '';
  for (const entry in entries) {
    const link = `<li><a href=""></a></li>`;
  }
  return `<ul>${list}</ul>`;
}

export function entryTemplate() {
  return '';
}