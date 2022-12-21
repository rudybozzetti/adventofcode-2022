
import { SCREEN_WIDTH, prepareScreen, updateScreen, debugScreen, play, part1 } from './day17'

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

describe('day17', () => {

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
    const [s] = play(10, testInput)
    debugScreen(s)
  })

  it.only('part1', () => {
    expect(part1(testInput)).toBe(3068)

  })
})