

import { prepareMap, countVisible, visibleInRow, part1, part2, scenicViewRow, findBestScenicView } from './day08'

const testInput = `30373
25512
65332
33549
35390`

const testMap = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0]
]

describe('day08', () => {



  it('prepareMap', () => {
    expect(prepareMap(testInput)).toStrictEqual(testMap)
  })

  it('visibleInRow', () => {

    expect(visibleInRow(5, [2, 5, 5, 1, 2], 1)).toBe(true)
    expect(visibleInRow(5, [2, 5, 5, 1, 2], 2)).toBe(true)
    expect(visibleInRow(1, [2, 5, 5, 1, 2], 3)).toBe(false)

    expect(visibleInRow(5, [6, 5, 3, 3, 2], 1)).toBe(true)
    expect(visibleInRow(3, [6, 5, 3, 3, 2], 2)).toBe(false)
    expect(visibleInRow(3, [6, 5, 3, 3, 2], 3)).toBe(true)

    expect(visibleInRow(3, [3, 3, 5, 4, 9], 1)).toBe(false)
    expect(visibleInRow(5, [3, 3, 5, 4, 9], 2)).toBe(true)
    expect(visibleInRow(4, [3, 3, 5, 4, 9], 3)).toBe(false)

    //
    expect(visibleInRow(5, [0, 5, 5, 3, 5], 1)).toBe(true)
    expect(visibleInRow(5, [0, 5, 5, 3, 5], 2)).toBe(false)
    expect(visibleInRow(3, [0, 5, 5, 3, 5], 3)).toBe(false)

    expect(visibleInRow(5, [3, 5, 3, 5, 3], 1)).toBe(true)
    expect(visibleInRow(3, [3, 5, 3, 5, 3], 2)).toBe(false)
    expect(visibleInRow(5, [3, 5, 3, 5, 3], 3)).toBe(true)

    expect(visibleInRow(1, [7, 1, 3, 4, 9], 1)).toBe(false)
    expect(visibleInRow(3, [7, 1, 3, 4, 9], 2)).toBe(false)
    expect(visibleInRow(4, [7, 1, 3, 4, 9], 3)).toBe(false)

  })

  it('countVisible', () => {
    expect(countVisible(testMap)).toBe(21)

  })

  it('scenicViewRow', () => {
    expect(scenicViewRow(5, [2, 5, 5, 1, 2], 1)).toBe(1)
    expect(scenicViewRow(5, [2, 5, 5, 1, 2], 2)).toBe(2)
    //
    expect(scenicViewRow(5, [3, 5, 3, 5, 3], 1)).toBe(2)
  })

  it('calcScenicView', () => {
    expect(findBestScenicView(testMap)).toBe(8)
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(21)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(8)
  })
})