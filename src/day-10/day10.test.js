import { getInstructions, getState, getCycles, getSignalStr, part1, part2 } from './day10'


const testInput0 = `noop
addx 3
addx -5`

const testInstructions0 = [
  'noop', 'addx 3', 'addx -5'
]

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`








const testScreen = [
  '##..##..##..##..##..##..##..##..##..##..',
  '###...###...###...###...###...###...###.',
  '####....####....####....####....####....',
  '#####.....#####.....#####.....#####.....',
  '######......######......######......####',
  '#######.......#######.......#######.....',
].join('')

describe('day10', () => {

  it('getInstructions', () => {
    expect(getInstructions(testInput0)).toStrictEqual(testInstructions0)
  })

  it('getState', () => {

    expect(getState(1, testInstructions0)).toStrictEqual(
      [1, 1, 1, 4, 4, -1]
    )
  })

  it('getCycles', () => {
    expect(getCycles(6)).toStrictEqual([20, 60, 100, 140, 180, 220])
  })

  it('getSignalStr', () => {
    const dummy = Array.from({ length: 220 }).map(x => 1)
    expect(getSignalStr(dummy)).toStrictEqual([20, 60, 100, 140, 180, 220])
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(13140)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(testScreen)
  })
})