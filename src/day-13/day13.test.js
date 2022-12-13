import {buildPairs, OK,KO,NEUTRAL, isNumber, compareValues, compareLists, part1, sortPackets, part2, dividers} from './day13'

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

const testPairs = [
[ [1,1,3,1,1],
  [1,1,5,1,1]
],

[ [[1],[2,3,4]],
  [[1],4]
],

[ [9],
  [[8,7,6]]
],

[ [[4,4],4,4],
  [[4,4],4,4,4]
],

[ [7,7,7,7],
  [7,7,7]
],

[ [],
  [3]
],

[ [[[]]],
  [[]]
],

[ [1,[2,[3,[4,[5,6,7]]]],8,9],
  [1,[2,[3,[4,[5,6,0]]]],8,9]
]

]

describe('day13', () => {

  it('buildPairs', () => {
    expect(buildPairs(`[1]\n[2]\n\n[3]\n[4]`)).toStrictEqual([
      [[1],[2]]
      ,
      [[3],[4]]
    ])

    expect(buildPairs(testInput)).toStrictEqual(testPairs)
  })

  it('isNumber', () => {
    expect(isNumber('a')).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(555)).toBe(true)
  })

  it('compareValues', () => {
    expect(( ) => compareValues('')).toThrow()
    expect(( ) => compareValues(1,'')).toThrow()
    //
    expect(compareValues(0,0)).toBe(NEUTRAL)
    expect(compareValues(0,1)).toBe(OK)
    expect(compareValues(2,1)).toBe(KO)
  })

  it('compareLists', () => {
    expect(( ) => compareLists('')).toThrow()
    expect(( ) => compareLists([],'')).toThrow()
    //
    expect(compareLists([1],[1])).toBe(NEUTRAL)
   
    expect(compareLists([] , [3])).toBe(OK)
    expect(compareLists([[]] , [])).toBe(KO)
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(13)
  })

  it('sortPackets', ( )=> {
    expect(sortPackets([[],[1,2]])).toStrictEqual([[],[1,2]])
  })

  it('part2', () => {
    expect(part2(testInput, dividers)).toBe(140)
  })


})