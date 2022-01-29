import { max, mean, median, min, sum, variance } from 'mathjs';
import { makeDataPage } from './make-html.js';
import { getData } from './read-files.js';

// Lúppa frekar í öðru falli og senda inn nums hingað fyrir hvert gagnasett
// eslint-disable-next-line no-unused-vars
async function getCalculations() {
  const data = await getData(); // Ætti að vera parsed data samt
  const someArray = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const results = {
      title: data[i].title,
      calculations: {
        vari: variance(data[i].nums),
        max: max(data[i].nums),
        mean: mean(data[i].nums),
        median: median(data[i].nums),
        min: min(data[i].nums),
        sum: sum(data[i].nums),
        range: max(data[i].nums) - min(data[i].nums),
      },
    };
    someArray.push(results);

    console.info(someArray);
  }

  // eslint-disable-next-line no-unused-vars
  const template = `
    <!DOCTYPE html>
    <head>
      <title>xx</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      ${data}

    </body>
    `;
  return someArray;
}

async function main() {
  const x = await getData();
  const y = await makeDataPage(x);
  console.info(y);
  // console.info(y);
}
main().catch((err) => console.error(err));
