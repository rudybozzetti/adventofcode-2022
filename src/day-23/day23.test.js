import { parseInput, part1 } from './day23'

const testInput = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

const testModel = [
  { x: 4, y: 0 },
  { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
  { x: 0, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
  { x: 1, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
  { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
  { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
  { x: 1, y: 6 }, { x: 4, y: 6 },
]

describe('day23', () => {


  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testModel)

  })

  it('part1', () => {
    expect(part1(testInput)).toBe(110)
  })
})