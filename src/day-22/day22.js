

export const parseInput = input => {
  return input.split(/\n/).reduce(({ map, blank, path, start }, line) => {
    if (blank) {
      //  previous line was blank
      const x = map[0].indexOf('.')

      return {
        map,
        blank: false,
        path: line,
        start: { x, y: 0 }
      }
    } else if (line.trim().length === 0) {
      return {
        map,
        blank: true,
        path,
        start
      }
    } else {
      return {
        map: [...map, line],
        blank,
        path,
        start
      }
    }

  }, {
    map: [],
    blank: false,
    path: undefined,
    start: undefined
  })
}

//  < > ^ v

const clockwiseRotation = {
  '<': '^',
  '>': 'v',
  '^': '>',
  'v': '<'
}

const counterClockwiseRotation = {
  '<': 'v',
  '>': '^',
  '^': '<',
  'v': '>'
}


export const moveRight = (map, cmd, position) => {
  const row = map[position.y]
  return Array.from({ length: cmd }).reduce(({ x, y }) => {
    const firstAvail = row.split('').findIndex(o => o === '.' || o === '#')
    const newX = ((x + 1) <= (row.length - 1)) ? (x + 1) : firstAvail
    const nextCell = row[newX]

    if (nextCell === '#') {
      //  solid wall
      return { x, y }
    } else if (nextCell === '.') {
      //  ok
      return {
        x: newX,
        y
      }
    } else {
      //  shouldn't be here
      throw Error(`### move > should not be here at x:${x}, y:${y}`)
    }
  }, position)
}


export const moveLeft = (map, cmd, position) => {
  const row = map[position.y]
  return Array.from({ length: cmd }).reduce(({ x, y }) => {
    const firstAvail = row.split('').findIndex(o => o === '.' || o === '#')
    const newX = ((x - 1) < firstAvail) ? (row.length - 1) : x - 1
    const nextCell = row[newX]

    if (nextCell === '#') {
      //  solid wall
      return { x, y }
    } else if (nextCell === '.') {
      //  ok
      return {
        x: newX,
        y
      }
    } else {
      //  shouldn't be here
      throw Error(`### move < should not be here at x:${x}, y:${y}`)
    }
  }, position)
}

export const moveUp = (map, cmd, position) => {
  const column = Array.from({ length: map.length }).reduce((acc, _, index) => {
    const row = map[index]
    if (position.x <= (row.length - 1)) {
      return acc + row[position.x]
    }

    return acc + ' '

  }, '')

  const firstAvail = column.split('').findIndex(o => o === '.' || o === '#')
  const lastAvail = column.split('').findLastIndex(o => o === '.' || o === '#')

  console.log('### column moving up', column, 'firstAvail', firstAvail, 'lastAvail', lastAvail)

  return Array.from({ length: cmd }).reduce(({ x, y }) => {
    const newY = ((y - 1) < firstAvail) ? (lastAvail) : y - 1
    const nextCell = column[newY]

    if (nextCell === '#') {
      //  solid wall
      return { x, y }
    } else if (nextCell === '.') {
      //  ok
      return {
        x,
        y: newY
      }
    } else {
      //  shouldn't be here
      throw Error(`### move ^ should not be here at x:${x}, y:${y}`)
    }
  }, position)


}

export const moveDown = (map, cmd, position) => {
  const column = Array.from({ length: map.length }).reduce((acc, _, index) => {
    const row = map[index]
    if (position.x <= (row.length - 1)) {
      return acc + row[position.x]
    }

    return acc + ' '

  }, '')

  const firstAvail = column.split('').findIndex(o => o === '.' || o === '#')
  const lastAvail = column.split('').findLastIndex(o => o === '.' || o === '#')

  console.log('### column moving down', column, 'firstAvail', firstAvail, 'lastAvail', lastAvail)

  return Array.from({ length: cmd }).reduce(({ x, y }) => {
    const newY = ((y + 1) > lastAvail) ? (firstAvail) : y + 1
    const nextCell = column[newY]

    if (nextCell === '#') {
      //  solid wall
      return { x, y }
    } else if (nextCell === '.') {
      //  ok
      return {
        x,
        y: newY
      }
    } else {
      //  shouldn't be here
      throw Error(`### move v should not be here at x:${x}, y:${y}`)
    }
  }, position)
}


export const updatePosition = (map, cmd, position, direction) => {
  if (cmd === 'R') {
    return {
      position,
      direction: clockwiseRotation[direction]
    }
  }

  if (cmd === 'L') {
    return {
      position,
      direction: counterClockwiseRotation[direction]
    }
  }

  switch (direction) {
    case '>':
      return {
        direction,
        position: moveRight(map, cmd, position)
      }
    case '<':
      return {
        direction,
        position: moveLeft(map, cmd, position)
      }
    case '^':
      return {
        direction,
        position: moveUp(map, cmd, position)
      }

    case 'v':
      return {
        direction,
        position: moveDown(map, cmd, position)
      }
  }
}

export const move = ({ map, path, start }) => {

  return path.split(/([RL]|\d+)/g).reduce((acc, cmd) => {
    if (cmd) {
      console.log('### move cmd', cmd)
      const { position, direction } = updatePosition(map, cmd, acc.position, acc.direction)

      console.log('### upd position, direction', position, direction)

      return {
        position,
        direction
      }
    }


    return acc
  }, {
    position: { ...start },
    direction: '>'
  })


}


const directionScore = {
  '>': 0,
  'v': 1,
  '<': 2,
  '^': 3
}

export const part1 = input => {
  const model = parseInput(input)
  const { position: { x, y }, direction } = move(model)
  //
  const result = 1000 * (y + 1) + 4 * (x + 1) + directionScore[direction]


  return result
}

export const part2 = input => {

}