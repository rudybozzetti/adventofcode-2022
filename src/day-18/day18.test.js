import { buildModel, part1, floodFill, part2 } from './day18'

const testInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

describe('day18', () => {

  it('buildModel', () => {
    expect(buildModel(testInput)).toStrictEqual(
      {
        map: [[2, 2, 2], [1, 2, 2], [3, 2, 2], [2, 1, 2], [2, 3, 2], [2, 2, 1], [2, 2, 3], [2, 2, 4], [2, 2, 6], [1, 2, 5], [3, 2, 5], [2, 1, 5], [2, 3, 5]],
        max: { x: 3, y: 3, z: 6 },
        min: { x: 1, y: 1, z: 1 }
      })
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(64)
  })

  it('floodFill', () => {
    const map = [[1, 1, 1]]
    expect(floodFill(map, { x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 2 }).length).toBe(26)

    expect(floodFill([[1, 1, 1], [2, 1, 1]], { x: 0, y: 0, z: 0 }, { x: 3, y: 2, z: 2 }).length).toBe(34)
  })

  it.only('part2', () => {
    expect(part2(testInput)).toBe(58)
  })
})