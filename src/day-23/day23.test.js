import {
  parseInput, Nfinder,
  Efinder,
  Sfinder,
  Wfinder, nearFinder, part1, part2
} from './day23'

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

  it('Nfinder', () => {
    expect(Nfinder(2, 2)({ x: 0, y: 1 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 1, y: 1 })).toBe(true)
    expect(Nfinder(2, 2)({ x: 2, y: 1 })).toBe(true)
    expect(Nfinder(2, 2)({ x: 3, y: 1 })).toBe(true)
    expect(Nfinder(2, 2)({ x: 4, y: 1 })).toBe(false)

    expect(Nfinder(2, 2)({ x: 0, y: 2 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 1, y: 2 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 2, y: 2 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 3, y: 2 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 4, y: 2 })).toBe(false)

    expect(Nfinder(2, 2)({ x: 0, y: 3 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 1, y: 3 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 2, y: 3 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 3, y: 3 })).toBe(false)
    expect(Nfinder(2, 2)({ x: 4, y: 3 })).toBe(false)
  })

  it('Efinder', () => {
    expect(Efinder(2, 2)({ x: 3, y: 0 })).toBe(false)
    expect(Efinder(2, 2)({ x: 3, y: 1 })).toBe(true)
    expect(Efinder(2, 2)({ x: 3, y: 2 })).toBe(true)
    expect(Efinder(2, 2)({ x: 3, y: 3 })).toBe(true)
    expect(Efinder(2, 2)({ x: 3, y: 4 })).toBe(false)

    expect(Efinder(2, 2)({ x: 2, y: 0 })).toBe(false)
    expect(Efinder(2, 2)({ x: 2, y: 1 })).toBe(false)
    expect(Efinder(2, 2)({ x: 2, y: 2 })).toBe(false)
    expect(Efinder(2, 2)({ x: 2, y: 3 })).toBe(false)
    expect(Efinder(2, 2)({ x: 2, y: 4 })).toBe(false)

    expect(Efinder(2, 2)({ x: 1, y: 0 })).toBe(false)
    expect(Efinder(2, 2)({ x: 1, y: 1 })).toBe(false)
    expect(Efinder(2, 2)({ x: 1, y: 2 })).toBe(false)
    expect(Efinder(2, 2)({ x: 1, y: 3 })).toBe(false)
    expect(Efinder(2, 2)({ x: 1, y: 4 })).toBe(false)
  })

  it('Sfinder', () => {
    expect(Sfinder(2, 2)({ x: 0, y: 3 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 1, y: 3 })).toBe(true)
    expect(Sfinder(2, 2)({ x: 2, y: 3 })).toBe(true)
    expect(Sfinder(2, 2)({ x: 3, y: 3 })).toBe(true)
    expect(Sfinder(2, 2)({ x: 4, y: 3 })).toBe(false)

    expect(Sfinder(2, 2)({ x: 0, y: 2 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 1, y: 2 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 2, y: 2 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 3, y: 2 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 4, y: 2 })).toBe(false)

    expect(Sfinder(2, 2)({ x: 0, y: 1 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 1, y: 1 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 2, y: 1 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 3, y: 1 })).toBe(false)
    expect(Sfinder(2, 2)({ x: 4, y: 1 })).toBe(false)
  })

  it('Wfinder', () => {
    expect(Wfinder(2, 2)({ x: 1, y: 0 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 1, y: 1 })).toBe(true)
    expect(Wfinder(2, 2)({ x: 1, y: 2 })).toBe(true)
    expect(Wfinder(2, 2)({ x: 1, y: 3 })).toBe(true)
    expect(Wfinder(2, 2)({ x: 1, y: 4 })).toBe(false)

    expect(Wfinder(2, 2)({ x: 2, y: 0 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 2, y: 1 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 2, y: 2 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 2, y: 3 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 2, y: 4 })).toBe(false)

    expect(Wfinder(2, 2)({ x: 3, y: 0 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 3, y: 1 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 3, y: 2 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 3, y: 3 })).toBe(false)
    expect(Wfinder(2, 2)({ x: 3, y: 4 })).toBe(false)
  })

  it('nearFinder', () => {
    expect(nearFinder(2, 2)({ x: 0, y: 0 })).toBe(false)
    expect(nearFinder(2, 2)({ x: 2, y: 1 })).toBe(true)
    expect(nearFinder(2, 2)({ x: 1, y: 1 })).toBe(true)
    expect(nearFinder(2, 2)({ x: 3, y: 3 })).toBe(true)
    expect(nearFinder(2, 2)({ x: 4, y: 4 })).toBe(false)
    //
    expect(nearFinder(2, 2)({ x: 2, y: 2 })).toBe(false)
  })


  it('part1', () => {
    expect(part1(testInput)).toBe(110)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(20)
  })
})