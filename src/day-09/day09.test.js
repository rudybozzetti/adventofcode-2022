
import { buildMoves, getDistance, singleMove, move, part1, part2 } from './day09'

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const testMoves = [
  ['R', 4],
  ['U', 4],
  ['L', 3],
  ['D', 1],
  ['R', 4],
  ['D', 1],
  ['L', 5],
  ['R', 2],
]

describe('day09', () => {

  it('buildMoves', () => {
    expect(buildMoves(testInput)).toStrictEqual(testMoves)
  })

  it('getDistance', () => {
    expect(getDistance([0, 0], [0, 0])).toBe(0)
    expect(getDistance([0, 0], [1, 0])).toBe(1)
    expect(getDistance([0, 0], [0, 1])).toBe(1)
    expect(getDistance([1, 1], [0, 1])).toBe(1)
    expect(getDistance([1, 1], [1, 0])).toBe(1)
    //
    expect(getDistance([0, 0], [1, 1]) > 1).toBeTruthy()
  })

  it('singleMove', () => {
    expect(singleMove({ H: [0, 0], T: [0, 0] }, 'R')).toStrictEqual({ H: [1, 0], T: [0, 0] })
    expect(singleMove({ H: [1, 0], T: [0, 0] }, 'R')).toStrictEqual({ H: [2, 0], T: [1, 0] })
    expect(singleMove({ H: [2, 0], T: [1, 0] }, 'R')).toStrictEqual({ H: [3, 0], T: [2, 0] })
    expect(singleMove({ H: [3, 0], T: [2, 0] }, 'R')).toStrictEqual({ H: [4, 0], T: [3, 0] })
    //
    expect(singleMove({ H: [4, 0], T: [3, 0] }, 'U')).toStrictEqual({ H: [4, 1], T: [3, 0] })
    expect(singleMove({ H: [4, 1], T: [3, 0] }, 'U')).toStrictEqual({ H: [4, 2], T: [4, 1] })
    expect(singleMove({ H: [4, 2], T: [4, 1] }, 'U')).toStrictEqual({ H: [4, 3], T: [4, 2] })
    expect(singleMove({ H: [4, 3], T: [4, 2] }, 'U')).toStrictEqual({ H: [4, 4], T: [4, 3] })
    //
    expect(singleMove({ H: [4, 4], T: [4, 3] }, 'L')).toStrictEqual({ H: [3, 4], T: [4, 3] })

  })

  it('move', () => {
    expect(move({ H: [0, 0], T: [0, 0] }, 'R', 4)).toStrictEqual({
      position: { H: [4, 0], T: [3, 0] },
      visited: [[0, 0], [1, 0], [2, 0], [3, 0]]
    })
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(13)

  })

  it('part2', () => {

  })
})