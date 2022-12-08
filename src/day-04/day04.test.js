import { part1, part2, fullyContains, stringToIntervals, overlaps } from './day04'

describe('day04', () => {

  it('stringToIntervals should return expected result', () => {
    expect(stringToIntervals('2-3,4-5')).toStrictEqual([[2, 3], [4, 5]])
  })

  it('fullyContains should return expected result', () => {
    expect(fullyContains([2, 4], [6, 8])).toBe(false)
    expect(fullyContains([2, 3], [4, 5])).toBe(false)
    expect(fullyContains([5, 7], [7, 9])).toBe(false)
    expect(fullyContains([2, 6], [4, 8])).toBe(false)


  })

  it('overlaps should return expected results', () => {

    expect(overlaps([2, 4], [6, 8])).toBe(false)
    expect(overlaps([2, 3], [4, 5])).toBe(false)

    expect(overlaps([5, 7], [7, 9])).toBe(true)
    expect(overlaps([2, 8], [3, 7])).toBe(true)
    expect(overlaps([6, 6], [4, 6])).toBe(true)
    expect(overlaps([2, 6], [4, 8])).toBe(true)
  })

  it('part1 should return expected result', () => {
    const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

    expect(part1(testData)).toBe(2)
  })

  it('part2 should return expected result', () => {
    const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

    expect(part2(testData)).toBe(4)
  })


})