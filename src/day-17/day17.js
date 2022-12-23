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
  ['@@@@'],

  ['.@.', '@@@', '.@.'],

  ['@@@', '..@', '..@'],

  ['@', '@', '@', '@'],

  ['@@', '@@']
]

export const SCREEN_WIDTH = 7

export const prepareScreen = (screen = [], shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (screen.length < shapePosition.y + shape.length) {
    const h = shapePosition.y + shape.length - screen.length
    //
    const newLines = [...Array(h)].map(_ => Array(SCREEN_WIDTH).fill('.'))

    for (let i = 0; i < h; i++) {
      screen.push(Array(SCREEN_WIDTH).fill('.'))
    }
  }

}

export const updateScreen = (screen = [], shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] !== '.') {
        screen[shapePosition.y + i][shapePosition.x + j] = '#'
      }
    }
  }
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
        shape[i][j] !== '.') {

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
        shape[i][j] !== '.') {

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
        shape[i][j] !== '.') {


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
  let ymax = 0
  let shapeCoords = { x: undefined, y: undefined }
  let shapeIndex = 0
  let screen = []


  while (counter < counterLimit) {
    //
    if (settled) {
      //  console.log('### prepare screen for shape', shapeIndex)
      shapeCoords = { x: 2, y: ymax + 3 }
      prepareScreen(screen, shapeIndex, shapeCoords)
      //
      settled = false

    }

    //  move
    const move = moves[moveIndex]
    //  console.log('### move', move)
    moveIndex = (moveIndex + 1) % moves.length

    if (move === '<' && tryMoveLeft(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x - 1
    }

    if (move === '>' && tryMoveRight(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x + 1

    }

    //  down
    //  console.log('### try move down shape', shapeIndex)
    if (tryMoveDown(screen, shapeIndex, shapeCoords)) {
      shapeCoords.y = shapeCoords.y - 1
      //  console.log('### move down shape', shapeIndex, 'ok')

    } else {
      const shape = SHAPES[shapeIndex]
      //  console.log('### settled shape', shapeIndex, 'at x:', shapeCoords.x, 'y:', shapeCoords.y, 'with ymax', shapeCoords.y + shape.length - 1)

      updateScreen(screen, shapeIndex, shapeCoords)
      settled = true
      ymax = Math.max(ymax, shapeCoords.y + shape.length)
      shapeIndex = (shapeIndex + 1) % SHAPES.length
      //
      counter++
    }

  }


  debugScreen(screen, `part 1 with ${counterLimit} blocks # counter: ${counter}`)

  return [screen, ymax]
}

export const memoKey = (moveIndex, shapeIndex, screen) => {
  const latestRows = screen.slice(-200).reduce((acc, row) => acc + '|' + row.join(''), '')
  const key = `m:${moveIndex},s:${shapeIndex},scr:${latestRows}`
  //
  //  console.log('### memoKey', key)
  //
  return key
}

export const play2 = (counterLimit = 1, moves) => {
  let counter = 0
  let settled = true
  let moveIndex = 0
  let ymax = 0
  let shapeCoords = { x: undefined, y: undefined }
  let shapeIndex = 0
  let screen = []
  let ytoadd = 0
  //
  const memoMap = new Map()
  //


  while (counter < counterLimit) {
    //
    if (settled) {
      //  console.log('### prepare screen for shape', shapeIndex)
      shapeCoords = { x: 2, y: ymax + 3 }
      prepareScreen(screen, shapeIndex, shapeCoords)
      //
      settled = false

    }

    //  move
    const move = moves[moveIndex]
    //  console.log('### move', move)
    moveIndex = (moveIndex + 1) % moves.length

    if (move === '<' && tryMoveLeft(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x - 1

    }

    if (move === '>' && tryMoveRight(screen, shapeIndex, shapeCoords)) {
      shapeCoords.x = shapeCoords.x + 1
    }

    //  down
    //  console.log('### try move down shape', shapeIndex)
    if (tryMoveDown(screen, shapeIndex, shapeCoords)) {
      shapeCoords.y = shapeCoords.y - 1
      //  console.log('### move down shape', shapeIndex, 'ok')

    } else {
      const shape = SHAPES[shapeIndex]
      //  console.log('### settled shape', shapeIndex, 'at x:', shapeCoords.x, 'y:', shapeCoords.y, 'with ymax', shapeCoords.y + shape.length - 1)

      updateScreen(screen, shapeIndex, shapeCoords)
      settled = true
      ymax = Math.max(ymax, shapeCoords.y + shape.length)
      //
      const key = memoKey(moveIndex, shapeIndex, screen)
      if (!memoMap.has(key)) {
        memoMap.set(key, { ymax, counter })
      } else {
        //
        const prevMemo = memoMap.get(key)
        memoMap.clear()
        console.log('### repetition found!', prevMemo)
        const remaining = counterLimit - counter
        const divider = counter - prevMemo.counter
        const ydelta = ymax - prevMemo.ymax
        const factor = Math.floor(remaining / divider)
        const rest = remaining % divider
        //  move forward
        counter = counter + (factor * divider)
        const moveIndex2 = (moveIndex + factor * divider) % moves.length
        const shapeIndex2 = (shapeIndex + factor * divider) % SHAPES.length
        ytoadd = ydelta * factor



        //  
        console.log('### memo', {
          key,
          prevMemo,
          fxd: factor * divider,
          remaining,
          divider,
          ydelta,
          factor,
          rest,
          counter,
          ymax,
          moveIndex,
          moveIndex2,
          shapeIndex,
          shapeIndex2
        })

      }

      //
      shapeIndex = (shapeIndex + 1) % SHAPES.length

      counter++
    }

  }


  debugScreen(screen, `part 1 with ${counterLimit} blocks # counter: ${counter}`)

  return [screen, ymax + ytoadd]
}

export const part1 = input => {

  const [screen, ymax] = play(2022, input)

  console.log('### ymax', ymax)


  return ymax

}

export const part2 = input => {
  const [screen, ymax] = play2(1000000000000, input)

  console.log('### ymax', ymax)


  return ymax
}