
import { parseInput, move, updatePosition, moveRight, moveLeft, part1, getFace } from './day22'

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

  it('moveRight', () => {
    expect(moveRight([' .#.'], 10, { x: 1, y: 0 })).toStrictEqual({ x: 1, y: 0 })
    expect(moveRight([' .#.'], 10, { x: 3, y: 0 })).toStrictEqual({ x: 1, y: 0 })
    expect(moveRight(['#...'], 10, { x: 1, y: 0 })).toStrictEqual({ x: 3, y: 0 })
    expect(moveRight(['#...'], 1, { x: 1, y: 0 })).toStrictEqual({ x: 2, y: 0 })
  })

  it('moveLeft', () => {
    expect(moveLeft([' .#.'], 10, { x: 1, y: 0 })).toStrictEqual({ x: 3, y: 0 })
    expect(moveLeft([' .#.'], 10, { x: 3, y: 0 })).toStrictEqual({ x: 3, y: 0 })
    expect(moveLeft(['#...'], 10, { x: 3, y: 0 })).toStrictEqual({ x: 1, y: 0 })
    expect(moveLeft(['#...'], 1, { x: 3, y: 0 })).toStrictEqual({ x: 2, y: 0 })
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(6032)
  })

  it.only('getFace', () => {
    expect(getFace(8, 0, 'test')).toBe(1)
    expect(getFace(11, 0, 'test')).toBe(1)
    expect(getFace(11, 3, 'test')).toBe(1)
    expect(getFace(8, 3, 'test')).toBe(1)
    //
    expect(getFace(0, 4, 'test')).toBe(2)
    expect(getFace(3, 4, 'test')).toBe(2)
    expect(getFace(0, 7, 'test')).toBe(2)
    expect(getFace(3, 7, 'test')).toBe(2)
    //
    expect(getFace(4, 4, 'test')).toBe(3)
    expect(getFace(7, 4, 'test')).toBe(3)
    expect(getFace(7, 4, 'test')).toBe(3)
    expect(getFace(7, 7, 'test')).toBe(3)
    //
    expect(getFace(8, 4, 'test')).toBe(4)
    expect(getFace(11, 4, 'test')).toBe(4)
    expect(getFace(11, 7, 'test')).toBe(4)
    expect(getFace(8, 7, 'test')).toBe(4)
    //
    expect(getFace(8, 8, 'test')).toBe(5)
    expect(getFace(11, 8, 'test')).toBe(5)
    expect(getFace(11, 11, 'test')).toBe(5)
    expect(getFace(8, 11, 'test')).toBe(5)
    //
    expect(getFace(12, 8, 'test')).toBe(6)
    expect(getFace(15, 8, 'test')).toBe(6)
    expect(getFace(15, 11, 'test')).toBe(6)
    expect(getFace(12, 11, 'test')).toBe(6)
    //
    expect(getFace(50, 0)).toBe(1)
    expect(getFace(99, 0)).toBe(1)
    expect(getFace(99, 49)).toBe(1)
    expect(getFace(50, 49)).toBe(1)
    //
    expect(getFace(100, 0)).toBe(2)
    expect(getFace(149, 0)).toBe(2)
    expect(getFace(149, 49)).toBe(2)
    expect(getFace(100, 49)).toBe(2)
    //
    expect(getFace(50, 50)).toBe(3)
    expect(getFace(99, 50)).toBe(3)
    expect(getFace(99, 99)).toBe(3)
    expect(getFace(50, 99)).toBe(3)
    //
    expect(getFace(0, 150)).toBe(4)
    expect(getFace(49, 150)).toBe(4)
    expect(getFace(49, 199)).toBe(4)
    expect(getFace(0, 199)).toBe(4)
    //
    expect(getFace(0, 100)).toBe(5)
    expect(getFace(49, 100)).toBe(5)
    expect(getFace(49, 149)).toBe(5)
    expect(getFace(0, 149)).toBe(5)
    //
    expect(getFace(50, 100)).toBe(6)
    expect(getFace(99, 100)).toBe(6)
    expect(getFace(99, 149)).toBe(6)
    expect(getFace(50, 149)).toBe(6)
  })
})