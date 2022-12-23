import { buildModel, part1 } from './day18'

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
        max: { x: 3, y: 3, z: 6 }
      })
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(64)
  })
})