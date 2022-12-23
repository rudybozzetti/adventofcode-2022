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

export const prepareScreen = (prevScreen = [], shapeIndex, shapePosition) => {
  const shape = SHAPES[shapeIndex]

  if (prevScreen.length < shapePosition.y + shape.length) {
    const h = shapePosition.y + shape.length - prevScreen.length
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
      if (shape[i][j] !== '.') {
        tmp[shapePosition.y + i][shapePosition.x + j] = '#'
      }

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
        shape[i][j] !== '.') {

        //  debugScreen(updateScreen(screen, shapeIndex, shapePosition), `collision moving left ${shapeIndex}`)

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
        shape[i][j] !== '.') {

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
  let ymax = 0
  let shapeCoords = { x: undefined, y: undefined }
  let shapeIndex = 0
  let screen = []


  while (counter < counterLimit) {
    //
    if (settled) {
      //  console.log('### prepare screen for shape', shapeIndex)
      shapeCoords = { x: 2, y: ymax + 3 }
      screen = prepareScreen(screen, shapeIndex, shapeCoords)
      //
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `prepare screen for shape ${shapeIndex}`)
      //
      settled = false

    }

    //  move
    const move = moves[moveIndex]
    //  console.log('### move', move)
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
    //  console.log('### try move down shape', shapeIndex)
    if (tryMoveDown(screen, shapeIndex, shapeCoords)) {
      shapeCoords.y = shapeCoords.y - 1
      //  console.log('### move down shape', shapeIndex, 'ok')
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `down ${shapeIndex}`)
    } else {
      const shape = SHAPES[shapeIndex]
      //  console.log('### settled shape', shapeIndex, 'at x:', shapeCoords.x, 'y:', shapeCoords.y, 'with ymax', shapeCoords.y + shape.length - 1)
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `settled shape ${shapeIndex}`)
      screen = updateScreen(screen, shapeIndex, shapeCoords)
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
  //
  const memoMap = new Map()
  //


  while (counter < counterLimit) {
    //
    if (settled) {
      //  console.log('### prepare screen for shape', shapeIndex)
      shapeCoords = { x: 2, y: ymax + 3 }
      screen = prepareScreen(screen, shapeIndex, shapeCoords)
      //
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `prepare screen for shape ${shapeIndex}`)
      //
      settled = false

    }

    //  move
    const move = moves[moveIndex]
    //  console.log('### move', move)
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
    //  console.log('### try move down shape', shapeIndex)
    if (tryMoveDown(screen, shapeIndex, shapeCoords)) {
      shapeCoords.y = shapeCoords.y - 1
      //  console.log('### move down shape', shapeIndex, 'ok')
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `down ${shapeIndex}`)
    } else {
      const shape = SHAPES[shapeIndex]
      //  console.log('### settled shape', shapeIndex, 'at x:', shapeCoords.x, 'y:', shapeCoords.y, 'with ymax', shapeCoords.y + shape.length - 1)
      //debugScreen(updateScreen(screen, shapeIndex, shapeCoords), `settled shape ${shapeIndex}`)
      screen = updateScreen(screen, shapeIndex, shapeCoords)
      settled = true
      ymax = Math.max(ymax, shapeCoords.y + shape.length)
      //
      const key = memoKey(moveIndex, shapeIndex, screen)
      if(!memoMap.has(key)) {
        memoMap.set(key, {ymax, counter})
      } else {
        //
        const prevMemo = memoMap.get(key)
        console.log('### repetition found!', prevMemo)
        const remaining = counterLimit - counter
        const divider = counter - prevMemo.counter
        const ydelta = ymax - prevMemo.ymax
        const factor = Math.floor(remaining / divider)
        const rest = remaining % divider
        //  move forward
        counter = counter + (factor * divider)
        
        ymax = ymax + (factor * ydelta)
        const moveIndex2 = (moveIndex + factor * divider) % moves.length
        const shapeIndex2 = (shapeIndex + factor * divider) % SHAPES.length



        //  
        console.log('### memo', {
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

  return [screen, ymax]
}

export const part1 = input => {

  const [screen, ymax] = play(2022, input)

  console.log('### ymax', ymax)


  return ymax

}

export const part2 = input => {

}