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

  ['..#', '..#', '###'],

  ['#', '#', '#', '#']

  ['##', '##']
]

const SCREEN_WIDTH = 7

export const updateScreen = (prevScreen = [], shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  const shapeHeight = shape.length
  const h = shapePosition.y + shapeHeight
  //
  const newLines = [...Array(h)].map(_ => Array(SCREEN_WIDTH).fill('.'))

  const tmp = [
    ...prevScreen,
    ...newLines
  ]

  for (let i = 0; i < shape.length; i++) {
    /*
    for (let j = 0; j < shape[0].length; j++) {
      tmp[shapePosition.y + i][shapePosition.x + j] = shape[i][j]
    }
    */
    for (let j = 0; j < SCREEN_WIDTH; j++) {
      console.log('### i',i, 'j',j,'shapePosition.x',shapePosition.x, '+ shape.0.len',shapePosition.x + shape[0].length  )
      tmp[shapePosition.y + i][j] = shapePosition.x <= j && j < shapePosition.x + shape[0].length ? shape[i][j - shapePosition.x ] : '.'


    }
  }

  return tmp
}

export const debugScreen = (screen) => {
  const content = screen.reduceRight((acc, row) => acc + row.join('') + "\n", ``)

  fs.writeFile(path.resolve(__dirname, 'debug.txt'), "\n===\n\n" + content, { flag: 'a+' }, (err) => {
    if (err) {
      console.error('### error', err)
    }

  })
}

export const tryMoveLeft = (screen, shapeIndex, shapePosition) => {
  if (shapePosition.x === 0) {
    return false
  }

  const shape = SHAPES[shapeIndex]

  for (let i = 0; i < shape.length; i++) {
    console.log('### shapePosition.y+i', shapePosition.y + i, '### shapePosition.x-1', shapePosition.x - 1)
    if (screen[shapePosition.y + i][shapePosition.x - 1] === '#' &&
      shape[shapePosition.y + i][shapePosition.x] === '#') {
      return false
    }
  }

  return true

}

export const play = (counterLimit = 1, moves) => {
  let counter = 0
  let settled = true
  let moveIndex = 0
  let ymax = 0
  let shapeCoords = { x: undefined, y: undefined }
  let shapeIndex = 0
  let screen = []


  while (counter < counterLimit) {
    //
    if (settled) {
      shapeCoords = { x: 2, y: ymax + 3 }
      screen = updateScreen(screen, shapeIndex, shapeCoords)
      settled = false
      //  questo quando non può più fare move down
      //  shapeIndex = (shapeIndex + 1) % SHAPES.length
    }

    //  move
    const move = moves[moveIndex]
    moveIndex++

    if (move === '<' && tryMoveLeft(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x - 1
      screen = updateScreen(screen, shapeIndex, shapeCoords)
    }








    //
    counter++
  }

  return screen
}

export const part1 = input => {


}

export const part2 = input => {

}