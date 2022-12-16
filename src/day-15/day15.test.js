

import { parseInput, findMaxDist, findMinMaxX, findPositions, part1, findBeacon, getOuterLines, part2 } from './day15'

const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

export const testMap = [
  { S: { x: 2, y: 18 }, B: { x: -2, y: 15 }, dist: 7 },
  { S: { x: 9, y: 16 }, B: { x: 10, y: 16 }, dist: 1 },
  { S: { x: 13, y: 2 }, B: { x: 15, y: 3 }, dist: 3 },
  { S: { x: 12, y: 14 }, B: { x: 10, y: 16 }, dist: 4 },
  { S: { x: 10, y: 20 }, B: { x: 10, y: 16 }, dist: 4 },
  { S: { x: 14, y: 17 }, B: { x: 10, y: 16 }, dist: 5 },
  { S: { x: 8, y: 7 }, B: { x: 2, y: 10 }, dist: 9 },
  { S: { x: 2, y: 0 }, B: { x: 2, y: 10 }, dist: 10 },
  { S: { x: 0, y: 11 }, B: { x: 2, y: 10 }, dist: 3 },
  { S: { x: 20, y: 14 }, B: { x: 25, y: 17 }, dist: 8 },
  { S: { x: 17, y: 20 }, B: { x: 21, y: 22 }, dist: 6 },
  { S: { x: 16, y: 7 }, B: { x: 15, y: 3 }, dist: 5 },
  { S: { x: 14, y: 3 }, B: { x: 15, y: 3 }, dist: 1 },
  { S: { x: 20, y: 1 }, B: { x: 15, y: 3 }, dist: 7 },



]

const testNoBeaconsPositions = [
  '-2,10', '-1,10', '0,10',
  '1,10', '3,10', '4,10',
  '5,10', '6,10', '7,10',
  '8,10', '9,10', '10,10',
  '11,10', '12,10', '13,10',
  '14,10', '15,10', '16,10',
  '17,10', '18,10', '19,10',
  '20,10', '21,10', '22,10',
  '23,10', '24,10'
]

describe('day15', () => {

  it('parseInput', () => {
    expect(parseInput('Sensor at x=2, y=18: closest beacon is at x=-2, y=15')).toStrictEqual(
      [{ S: { x: 2, y: 18 }, B: { x: -2, y: 15 }, dist: 7 }]
    )

    expect(parseInput(testInput)).toStrictEqual(
      testMap
    )
  })

  it('findMaxDist', () => {
    expect(findMaxDist(testMap)).toBe(10)
  })

  it('findMinMaxX', () => {
    expect(findMinMaxX(testMap)).toStrictEqual([-2, 25])
  })

  it('findPositions', () => {
    expect(findPositions(testMap, 10)).toStrictEqual(testNoBeaconsPositions)
  })

  it('part1', () => {
    expect(part1(testInput, 10)).toBe(26)
  })

  it('findBeacon', () => {
    expect(findBeacon(testMap, 0, 0, 20, 20)).toStrictEqual({ x: 14, y: 11 })
  })

  it.only('getOuterLines', () => {
    expect(getOuterLines({
      S: { x: 2, y: 2 },
      dist: 1
    })).toStrictEqual([-2, 2, 2, 6])
  })

  it('part2', () => {
    expect(part2(testInput, 0, 0, 20, 20)).toBe(56000011)
  })

})