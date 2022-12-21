const fs = require('fs');
const path = require('path')

/*

####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##

*/

const SHAPES = [
  ['####'],

  ['.#.', '###', '.#.'],

  ['###', '..#', '..#'],

  ['#', '#', '#', '#'],

  ['##', '##']
]

export const SCREEN_WIDTH = 7

export const prepareScreen = (prevScreen = [], ymax, shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (ymax < shapePosition.y + shape.length) {
    const h = shapePosition.y + shape.length - ymax - shape.length
    console.log('### append ', h, 'lines')
    //
    const newLines = [...Array(h)].map(_ => Array(SCREEN_WIDTH).fill('.'))

    return [
      ...prevScreen.map(x => [...x]),
      ...newLines
    ]

  }

  return prevScreen



}

export const updateScreen = (prevScreen = [], shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  const shapeHeight = shape.length
  //
  const tmp = [
    ...prevScreen.map(x => [...x])
  ]

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      tmp[shapePosition.y + i][shapePosition.x + j] = shape[i][j]
    }
  }

  return tmp
}

export const debugScreen = (screen, message = '') => {
  const content = `== ${message} ==\n` + screen.reduceRight((acc, row) => acc + row.join('') + "\n", ``)

  fs.writeFile(path.resolve(__dirname, 'debug.txt'), "\n===\n\n" + content, { flag: 'a+' }, (err) => {
    if (err) {
      console.error('### error', err)
    }

  })
}

export const tryMoveLeft = (screen, shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (shapePosition.x === 0) {
    return false
  }

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (screen[shapePosition.y + i][shapePosition.x + j - 1] === '#' &&
        shape[i][j] === '#') {

        //debugScreen(updateScreen(screen, shapeIndex, shapePosition), `collision moving left ${shapeIndex}`)

        return false
      }
    }
  }

  return true
}

export const tryMoveRight = (screen, shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (shapePosition.x + shape[0].length > 6) {
    return false
  }

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (screen[shapePosition.y + i][shapePosition.x + j + 1] === '#' &&
        shape[i][j] === '#') {

        //debugScreen(updateScreen(screen, shapeIndex, shapePosition), `collision moving right ${shapeIndex}`)
        return false
      }
    }
  }

  return true
}

export const tryMoveDown = (screen, shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (shapePosition.y === 0) {
    return false
  }



  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (screen[shapePosition.y + i - 1][shapePosition.x + j] === '#' &&
        shape[i][j] === '#') {

        const t = updateScreen(screen, shapeIndex, shapePosition)


        //debugScreen(t, `collision with shape ${shapeIndex} at x: ${shapePosition.x}, y: ${shapePosition.y}`)

        return false
      }
    }
  }

  return true
}

export const play = (counterLimit = 1, moves) => {
  let counter = 0
  let settled = true
  let moveIndex = 0
  let ymax = -1
  let shapeCoords = { x: undefined, y: undefined }
  let shapeIndex = 0
  let screen = []


  while (counter < counterLimit) {
    //
    if (settled) {
      console.log('### prepare screen for shape', shapeIndex)
      shapeCoords = { x: 2, y: ymax + 4 }
      screen = prepareScreen(screen, ymax, shapeIndex, shapeCoords)
      //
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `prepare screen for shape ${shapeIndex}`)
      //
      settled = false

    }

    //  move
    const move = moves[moveIndex]
    console.log('### move', move)
    moveIndex = (moveIndex + 1) % moves.length

    if (move === '<' && tryMoveLeft(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x - 1
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `left ${shapeIndex}`)
    }

    if (move === '>' && tryMoveRight(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x + 1
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `right ${shapeIndex}`)
    }

    //  down
    console.log('### try move down shape', shapeIndex)
    if (tryMoveDown(screen, shapeIndex, shapeCoords)) {
      shapeCoords.y = shapeCoords.y - 1
      console.log('### move down shape', shapeIndex, 'ok')
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `down ${shapeIndex}`)
    } else {
      const shape = SHAPES[shapeIndex]
      console.log('### settled shape', shapeIndex, 'at x:', shapeCoords.x, 'y:', shapeCoords.y, 'with ymax', shapeCoords.y + shape.length - 1)
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `settled shape ${shapeIndex}`)
      screen = updateScreen(screen, shapeIndex, shapeCoords)
      settled = true
      ymax = shapeCoords.y + shape.length - 1
      shapeIndex = (shapeIndex + 1) % SHAPES.length
      //
      counter++
    }

  }

  return [screen, ymax]
}

export const part1 = input => {

  const [screen, ymax] = play(2022, input)
  console.log('### ymax', ymax)

  return ymax

}

export const part2 = input => {

}