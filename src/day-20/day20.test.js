
import { parseInput, mmod, getNewIndex, move, decrypt, part1 } from './day20'

const testInput = `1
2
-3
3
-2
0
4`

const testData = [1, 2, -3, 3, -2, 0, 4]
const testDecrypted = [1, 2, -3, 4, 0, 3, -2]

describe('day20', () => {

  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testData)
  })

  it('mmod', () => {
    expect(mmod(1 - 2, 7)).toBe(6)
  })


  it('getNewIndex', () => {
    expect(getNewIndex([4, 5, 6, 1, 7, 8, 9], 1)).toBe(4)
    expect(getNewIndex([4, -2, 5, 6, 7, 8, 9], -2)).toBe(5)
    expect(getNewIndex([1, 2, -3, 3, -2, 0, 4], 1)).toBe(1)
    expect(getNewIndex([2, 1, -3, 3, -2, 0, 4], 2)).toBe(2)
    expect(getNewIndex([1, -3, 2, 3, -2, 0, 4], -3)).toBe(4)
    expect(getNewIndex([1, 2, 3, -2, -3, 0, 4], 3)).toBe(5)
    expect(getNewIndex([1, 2, -2, -3, 0, 3, 4], -2)).toBe(6)
    expect(getNewIndex([1, 2, -3, 0, 3, 4, -2], 4)).toBe(3)


  })

  it('move', () => {

    expect(move([4, 5, 6, 1, 7, 8, 9], 1)).toStrictEqual([4, 5, 6, 7, 1, 8, 9])
    expect(move([4, -2, 5, 6, 7, 8, 9], -2)).toStrictEqual([4, 5, 6, 7, 8, -2, 9])
    expect(move([1, 2, -3, 3, -2, 0, 4], 1)).toStrictEqual([2, 1, -3, 3, -2, 0, 4])
    expect(move([2, 1, -3, 3, -2, 0, 4], 2)).toStrictEqual([1, -3, 2, 3, -2, 0, 4])
    expect(move([1, -3, 2, 3, -2, 0, 4], -3)).toStrictEqual([1, 2, 3, -2, -3, 0, 4])
    expect(move([1, 2, 3, -2, -3, 0, 4], 3)).toStrictEqual([1, 2, -2, -3, 0, 3, 4])
    expect(move([1, 2, -2, -3, 0, 3, 4], -2)).toStrictEqual([1, 2, -3, 0, 3, 4, -2])
    expect(move([1, 2, -3, 0, 3, 4, -2], 0)).toStrictEqual([1, 2, -3, 0, 3, 4, -2])

    expect(move([1, 2, -3, 0, 3, 4, -2], 4)).toStrictEqual([1, 2, -3, 4, 0, 3, -2])


  })

  it('decrypt', () => {
    expect(decrypt(testData)).toStrictEqual(testDecrypted)
  })

  it('part1', () => {
    expect(part1(testInput)).toStrictEqual(3)
  })
})