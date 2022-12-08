
const fs = require('fs');
const path = require('path')

import { getPrioritySum, getCommonBadgesSum } from './day03'

export const day03 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const sum = getPrioritySum(data)

    console.log('### sum', sum)

    const commonBadgesSum = getCommonBadgesSum(data)

    console.log('### commonBadgesSum', commonBadgesSum)
  } catch (err) {
    console.error(err);
  }

}

day03(path.resolve(__dirname, 'input.txt'))