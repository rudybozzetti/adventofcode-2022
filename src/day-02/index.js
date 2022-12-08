
const fs = require('fs');
const path = require('path')

import { getScore, getStratScore } from './day02'

export const day02 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const score = getScore(data)

    console.log('### score', score)

    const stratScore = getStratScore(data)

    console.log('### stratScore', stratScore)


  } catch (err) {
    console.error(err);
  }

}

day02(path.resolve(__dirname, 'input.txt'))