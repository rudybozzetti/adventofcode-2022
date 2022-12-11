
import { buildMoves, getDistance, singleMove, move, part1, moveKnot, moveKnots, part2 } from './day09'

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

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

  //

  it('moveKnot', () => {

    expect(moveKnot([0, 0], [0, 0], 'R')).toStrictEqual([0, 0])
    expect(moveKnot([4, 3], [4, 4], 'L')).toStrictEqual([4, 3])
    //
    expect(moveKnot([1, 0], [3, 0], 'R')).toStrictEqual([2, 0])
    expect(moveKnot([3, 0], [1, 0], 'L')).toStrictEqual([2, 0])
    expect(moveKnot([1, 3], [1, 1], 'D')).toStrictEqual([1, 2])
    expect(moveKnot([3, 1], [1, 1], 'U')).toStrictEqual([2, 1])


    // diag
    expect(moveKnot([1, 1], [2, 3], 'U')).toStrictEqual([2, 2])
    expect(moveKnot([1, 1], [3, 2], 'R')).toStrictEqual([2, 2])
    expect(moveKnot([3, 2], [1, 1], 'L')).toStrictEqual([2, 1])
    expect(moveKnot([1, 2], [3, 1], 'R')).toStrictEqual([2, 1])

    expect(moveKnot([3, 0], [1, 1], 'R')).toStrictEqual([2, 1])
    expect(moveKnot([3, 0], [1, 1], 'R')).toStrictEqual([2, 1])

  })

  it('moveKnots', () => {
    const step0 = Array.from({ length: 10 }).map(_ => ([11, 5]))
    const step1 = [[16, 5], [15, 5], [14, 5], [13, 5], [12, 5], [11, 5], [11, 5], [11, 5], [11, 5], [11, 5]]
    const step2 = [[16, 13], [16, 12], [16, 11], [16, 10], [16, 9], [15, 9], [14, 8], [13, 7], [12, 6], [11, 5]]
    const step3 = [[8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [12, 12], [12, 11], [12, 10], [12, 9], [12, 8]]
    const step4 = [[8, 10], [8, 11], [9, 12], [10, 12], [11, 12], [12, 12], [12, 11], [12, 10], [12, 9], [12, 8]]



    expect(moveKnots(step0, 'R', 5)).toStrictEqual({
      knots: step1,
      visited: ['11,5']
    })

    expect(moveKnots(step1, 'U', 8)).toStrictEqual({
      knots: step2,
      visited: ['11,5']
    })

    expect(moveKnots(step2, 'L', 8)).toStrictEqual({
      knots: step3,
      visited: ['11,5', '12,6', '13,7', '12,8']
    })

    expect(moveKnots(step3, 'D', 3)).toStrictEqual({
      knots: step4,
      visited: ['12,8']
    })



    //const { knots } = moveKnots(step1, 'U', 8)
    //console.log('### knots', knots)


  })

  it('part2', () => {
    expect(part2(testInput2)).toBe(36)
  })
})