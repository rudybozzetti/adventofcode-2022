
import { part1, part2 } from './day11'

import { dayMokeys } from './monkeys'

export const day11 = () => {
  try {
    const part1Result = part1(dayMokeys, 20)

    console.log('### part1Result', part1Result)

    const part2Result = part2(dayMokeys, 10000)

    console.log('### part2Result', part2Result)
  } catch (err) {
    console.error(err);
  }

}

day11()