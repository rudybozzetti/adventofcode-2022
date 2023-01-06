
import { parseInput, move, updatePosition, part1 } from './day22'

const testInput = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

const testModel = {
  map: [
    '        ...#',
    '        .#..',
    '        #...',
    '        ....',
    '...#.......#',
    '........#...',
    '..#....#....',
    '..........#.',
    '        ...#....',
    '        .....#..',
    '        .#......',
    '        ......#.',
  ],
  blank: false,
  path: '10R5L5R10L4R5L5',
  start: { x: 8, y: 0 }
}

describe('day22', () => {
  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testModel)
  })

  it('move', () => {
    expect(move(testModel)).toStrictEqual({ position: { x: 7, y: 5 }, direction: '>' })
  })

  it('updatePosition', () => {
    expect(updatePosition(testModel.map, '10', testModel.start, '>')).toStrictEqual({
      position: { x: 10, y: 0 },
      direction: '>'
    })

  })

  it('part1', () => {
    expect(part1(testInput)).toBe(6032)
  })
})