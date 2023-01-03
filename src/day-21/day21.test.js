
import { parseInput, solve, part1, solve2, part2, solveSimepleExpr } from './day21'


const testInput = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

const testModel = [
  { name: 'root', yell: undefined, name1: 'pppw', name2: 'sjmn', op: '+' },
  { name: 'dbpl', yell: 5 },
  { name: 'cczh', yell: undefined, name1: 'sllz', name2: 'lgvd', op: '+' },
  { name: 'zczc', yell: 2 },
  { name: 'ptdq', yell: undefined, name1: 'humn', name2: 'dvpt', op: '-' },
  { name: 'dvpt', yell: 3 },
  { name: 'lfqf', yell: 4 },
  { name: 'humn', yell: 5 },
  { name: 'ljgn', yell: 2 },
  { name: 'sjmn', yell: undefined, name1: 'drzm', name2: 'dbpl', op: '*' },
  { name: 'sllz', yell: 4 },
  { name: 'pppw', yell: undefined, name1: 'cczh', name2: 'lfqf', op: '/' },
  { name: 'lgvd', yell: undefined, name1: 'ljgn', name2: 'ptdq', op: '*' },
  { name: 'drzm', yell: undefined, name1: 'hmdt', name2: 'zczc', op: '-' },
  { name: 'hmdt', yell: 32 }
]

describe('day21', () => {
  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testModel)
  })

  it('solve', () => {
    return solve(testModel).then(result => {
      expect(result).toBe(152)
    })
  })

  it('part1', () => {
    return part1(testInput).then(result => {
      expect(result).toBe(152)
    })
  })

  it.only('solve2', () => {
    expect(solve2(testModel)).toBe(301)
  })

})