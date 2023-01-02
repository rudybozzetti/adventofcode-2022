
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

const p0 = { n: 1, oi: 0 }
const p1 = { n: 2, oi: 1 }
const p2 = { n: -3, oi: 2 }
const p3 = { n: 3, oi: 3 }
const p4 = { n: -2, oi: 4 }
const p5 = { n: 0, oi: 5 }
const p6 = { n: 4, oi: 6 }


describe('day20', () => {

  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testData)
  })

  it('mmod', () => {
    expect(mmod(1 - 2, 7)).toBe(6)
  })


  it('getNewIndex', () => {
    expect(getNewIndex(1, 3, 6)).toBe(4)
    expect(getNewIndex(-2, 1, 6)).toBe(5)
    //
    expect(getNewIndex(1, 0, 6)).toBe(1)
    expect(getNewIndex(2, 0, 6)).toBe(2)
    expect(getNewIndex(-3, 1, 6)).toBe(4)
    expect(getNewIndex(3, 2, 6)).toBe(5)
    expect(getNewIndex(-2, 2, 6)).toBe(6)
    expect(getNewIndex(4, 5, 6)).toBe(3)
    //
    expect(getNewIndex(-1, 1, 6)).toBe(6)
    expect(getNewIndex(-1, 0, 6)).toBe(5)
    expect(getNewIndex(1, 5, 6)).toBe(6)
    expect(getNewIndex(1, 6, 6)).toBe(1)


  })

  it('move', () => {

    expect(move([p0, p1, p2, p3, p4, p5, p6], 1, 0)).toStrictEqual([p1, p0, p2, p3, p4, p5, p6])
    expect(move([p1, p0, p2, p3, p4, p5, p6], 2, 1)).toStrictEqual([p0, p2, p1, p3, p4, p5, p6])
    expect(move([p0, p2, p1, p3, p4, p5, p6], -3, 2)).toStrictEqual([p0, p1, p3, p4, p2, p5, p6])
    expect(move([p0, p1, p3, p4, p2, p5, p6], 3, 3)).toStrictEqual([p0, p1, p4, p2, p5, p3, p6])
    expect(move([p0, p1, p4, p2, p5, p3, p6], -2, 4)).toStrictEqual([p0, p1, p2, p5, p3, p6, p4])
    expect(move([p0, p1, p2, p5, p3, p6, p4], 0, 5)).toStrictEqual([p0, p1, p2, p5, p3, p6, p4])
    expect(move([p0, p1, p2, p5, p3, p6, p4], 4, 6)).toStrictEqual([p0, p1, p2, p6, p5, p3, p4])


  })

  it('decrypt', () => {
    expect(decrypt(testData)).toStrictEqual(testDecrypted)
  })

  it('part1', () => {
    expect(part1(testInput)).toStrictEqual(3)
  })
})