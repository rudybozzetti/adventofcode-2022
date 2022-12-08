
const fs = require('fs');
const path = require('path')

import {prepareData, sumTop} from './day01'

export const day01 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const p = prepareData(data)
    //  console.log('### p',p)

    const max = Math.max(...p)

    const top3 = sumTop(p, 3)

    //
    console.log('### max', max)
    console.log('### top 3 sum', top3)

  } catch (err) {
    console.error(err);
  }

}

day01(path.resolve(__dirname, 'input.txt'))