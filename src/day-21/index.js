
const fs = require('fs');
const path = require('path')

import { part1, part2 } from './day21'

export const day21 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    part1(data).then(part1Result => {
      console.log('### part1Result', part1Result)
    })



    const part2Result = part2(data)

    console.log('### part2Result', part2Result)
  } catch (err) {
    console.error(err);
  }

}

day21(path.resolve(__dirname, 'input.txt'))