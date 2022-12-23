
import { SCREEN_WIDTH, tryMoveLeft, prepareScreen, updateScreen, debugScreen, play, play2, part1, part2 } from './day17'

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

describe('day17', () => {

  describe('tryMoveLeft', () => {
    const screen = [
      ['.', '.', '.', '.', '.', '.', '.'],  //  0
      ['#', '.', '.', '.', '.', '.', '.'],  //  1
    ]
    it('false when shape is attached to left border', () => {
      expect(tryMoveLeft(screen, 0, { x: 0, y: 0 })).toBe(false)
    })

    it('false when shape 1 height is attached to blocked space', () => {
      expect(tryMoveLeft(screen, 0, { x: 1, y: 1 })).toBe(false)
    })

    it('true when there is space between shape 1h and left', () => {
      expect(tryMoveLeft(screen, 0, { x: 2, y: 1 })).toBe(true)
    })

    it('true when there is space between shape 1h and border', () => {
      expect(tryMoveLeft(screen, 0, { x: 1, y: 0 })).toBe(true)
    })

    const screen2 = [
      ['.', '#', '.', '.', '.', '.', '.'],  //  0
      ['.', '.', '.', '.', '.', '.', '.'],  //  1
      ['.', '.', '.', '.', '.', '.', '.'],  //  2
    ]

    it('different shape', () => {
      expect(tryMoveLeft(screen2, 1, { x: 2, y: 0 })).toBe(true)
      expect(tryMoveLeft(screen2, 1, { x: 1, y: 0 })).toBe(false)
    })


  })




  it('prepareScreen', () => {
    const s = prepareScreen([], 0, 0, { x: 2, y: 3 })

    debugScreen(s)
  })


  it('updateScreen', () => {
    const screen = prepareScreen([], 0, { x: 2, y: 3 })
    const s = updateScreen(screen, 0, { x: 2, y: 3 })

    debugScreen(s)

  })

  it('play', () => {
    expect(play(1, testInput)[1]).toBe(1)
    expect(play(2, testInput)[1]).toBe(4)
    expect(play(10, testInput)[1]).toBe(17)
  })

  it('part1', () => {
    expect(part1(testInput)).toBe(3068)
  })

  it.only('play2', () => {
    expect(play2(2022, testInput)[1]).toBe(3068)
  })
})