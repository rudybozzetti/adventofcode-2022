
import { updateScreen, debugScreen,play } from './day17'

const testInput = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

describe('day17', () => {


  it('updateScreen', () => {
    const s = updateScreen([], 0, { x: 2, y: 3 })

    debugScreen(s)

  })

  it.only('play', () => {
    const s = play(1, '<')
    debugScreen(s)
  })
})