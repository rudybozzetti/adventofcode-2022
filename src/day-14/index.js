
const fs = require('fs');
const path = require('path')

import { part1, part2 } from './day14'

export const day14 = (inputFile) => {
  try {
    const data = fs.readFileSync(inputFile, 'utf8');

    const part1Result = part1(data, [500, 0])

    console.log('### part1Result', part1Result)

    const part2Result = part2(data, [500, 0])

    console.log('### part2Result', part2Result)
  } catch (err) {
    console.error(err);
  }

}

day14(path.resolve(__dirname, 'input.txt'))