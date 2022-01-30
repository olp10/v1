import { max, mean, median, min, sum } from 'mathjs';

export async function parse(dirtyArray) {
  const numsToReturn = [];
  for (let num of dirtyArray) {
    num.replace('.', '');
    num = num.trim();
    num.replace(',', '.');

    if (!num) {
      // eslint-disable-next-line no-continue
      continue;
    }

    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(num) && num !== '') {
      numsToReturn.push(num);
    }
  }
  return numsToReturn;
}

export async function getCalculations(parsedData) {
  // const data = await getData(); // Ætti að vera parsed data samt

  if (parsedData.nums.length !== 0) {
    try {
    // eslint-disable-next-line no-plusplus
      const results = {
        title: parsedData.title,
        calculations: {
          // vari: variance(parsedData),
          max: max(parsedData.nums),
          mean: mean(parsedData.nums),
          median: median(parsedData.nums),
          min: min(parsedData.nums),
          sum: sum(parsedData.nums),
          range: (max(parsedData.nums) - min(parsedData.nums)),
        }
      };
      return results;
    } catch(e) {
      console.info(e);
      return {
        title: parsedData.title
      };
    }
  }
  else {
    return {
      title: parsedData.title,
    }
  }
}
