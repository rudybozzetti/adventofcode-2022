
const fs = require('fs');
const path = require('path')

import { getPrioritySum } from './day03'

export const day03 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const sum = getPrioritySum(data)

    console.log('### sum', sum)
  } catch (err) {
    console.error(err);
  }

}

day03(path.resolve(__dirname, 'input.txt'))