
import { SCREEN_WIDTH, tryMoveLeft, prepareScreen, updateScreen, debugScreen, play, part1 } from './day17'

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

describe('day17', () => {

  describe('tryMoveLeft', () => {
    const screen = [
      ['.','.','.','.','.','.','.'],  //  0
      ['#','.','.','.','.','.','.'],  //  1
    ]
    it.only('', () => {

      expect(tryMoveLeft(screen, 0, {x: 0,y:0})).toBe(false)
      expect(tryMoveLeft(screen, 0, {x: 1,y:1})).toBe(false)
      expect(tryMoveLeft(screen, 0, {x: 2,y:1})).toBe(true)
      expect(tryMoveLeft(screen, 0, {x: 1,y:0})).toBe(true)
  
    })
  })

  


  it('prepareScreen', () => {
    const s = prepareScreen([], 0, 0, { x: 2, y: 3 })

    debugScreen(s)
  })


  it('updateScreen', () => {
    const screen = prepareScreen([], 0, 0, { x: 2, y: 3 })
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
})