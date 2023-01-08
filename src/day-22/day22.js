

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

//

export const getFacesBoundaries = (mode = '') => {

  return mode === 'test' ? {
    1: [8, 0, 11, 3],
    2: [0, 4, 3, 7],
    3: [4, 4, 7, 7],
    4: [8, 4, 11, 7],
    5: [8, 8, 11, 11],
    6: [12, 8, 15, 11],
  } : {
    1: [50, 0, 99, 49],
    2: [100, 0, 149, 49],
    3: [50, 50, 99, 99],
    4: [0, 150, 49, 199],
    5: [0, 100, 49, 149],
    6: [50, 100, 99, 149],
  }
}

export const getFace = (x, y, mode = '') => {
  const boundaries = getFacesBoundaries(mode)

  const result = Object.entries(boundaries).reduce((acc, [face, [minx, miny, maxx, maxy]]) => {
    if (x >= minx && x <= maxx && y >= miny && y <= maxy) {
      return parseInt(face)
    }
    return acc
  }, 0)


  /*
  if (result === 0) {
    throw Error(`getFace x,y ${x},${y} mode ${mode} shoold not be here`)
  }
  */

  return result
}

export const updateCubePosition = (map, cmd, x, y, direction, cube, mode = '') => {
  if (cmd === 'R') {
    return {
      x, y,
      direction: clockwiseRotation[direction]
    }
  }

  if (cmd === 'L') {
    return {
      x, y,
      direction: counterClockwiseRotation[direction]
    }
  }





  return Array.from({ length: cmd }).reduce(({ x, y, direction }, _) => {
    const faceN = getFace(x, y, mode)

    const face = cube[faceN]
    const m = direction === '>' ? 'nextRightCell' : direction === '<' ? 'nextLeftCell' : direction === '^' ? 'nextUpCell' : 'nextDownCell'
    console.log('###  x,y', x, y, 'faceN', faceN, 'm', m)

    const { x: newX, y: newY, direction: newDirection } = face[m](x, y)

    console.log('### newX, newY, newDirection', newX, newY, newDirection)
    const nextCell = map[newY][newX]

    if (nextCell === '#') {
      console.log('### wall at x,y', newX, newY)
      return { x, y, direction }
    }

    return { x: newX, y: newY, direction: newDirection }


  }, {
    x, y,
    direction
  })
}

export const getNextCell = (map, from, to, mode = '') => {
  const face = getFace(from.x, from.y, mode)
  const boundaries = getFacesBoundaries(mode)[face]


}

export const moveCubeRight = (map, cmd, position, cube, mode = '') => {
  return Array.from({ length: cmd }).reduce(({ x, y, direction }) => {
    const faceN = getFace(x, y, mode)
    const face = cube[faceN]
    const { x: newX, y: newY, direction: newDirection } = face.nextRightCell(x, y)
    const nextCell = map[newY][newX]
    if (nextCell === '#') {
      return { x, y, direction }
    } else {
      return {
        x: newX,
        y: newY,
        direction: newDirection
      }
    }
  }, {
    ...position,
    direction: '>'
  })
}

export const moveCubeLeft = (map, cmd, position, cube, mode = '') => {
  return Array.from({ length: cmd }).reduce(({ x, y, direction }) => {
    const faceN = getFace(x, y, mode)
    const face = cube[faceN]
    const { x: newX, y: newY, direction: newDirection } = face.nextLeftCell(x, y)
    const nextCell = map[newY][newX]
    if (nextCell === '#') {
      return { x, y, direction }
    } else {
      return {
        x: newX,
        y: newY,
        direction: newDirection
      }
    }
  }, {
    ...position,
    direction: '<'
  })
}

export const moveCubeUp = (map, cmd, position, cube, mode = '') => {
  return Array.from({ length: cmd }).reduce(({ x, y, direction }) => {
    const faceN = getFace(x, y, mode)
    const face = cube[faceN]
    const { x: newX, y: newY, direction: newDirection } = face.nextUpCell(x, y)
    const nextCell = map[newY][newX]
    if (nextCell === '#') {
      return { x, y, direction }
    } else {
      return {
        x: newX,
        y: newY,
        direction: newDirection
      }
    }
  }, {
    ...position,
    direction: '^'
  })
}

export const moveCubeDown = (map, cmd, position, cube, mode = '') => {
  return Array.from({ length: cmd }).reduce(({ x, y, direction }) => {
    const faceN = getFace(x, y, mode)
    console.log('### move cube down position', position, 'faceN', faceN)
    const face = cube[faceN]
    const { x: newX, y: newY, direction: newDirection } = face.nextDownCell(x, y)
    const nextCell = map[newY][newX]
    if (nextCell === '#') {
      return { x, y, direction }
    } else {
      return {
        x: newX,
        y: newY,
        direction: newDirection
      }
    }
  }, {
    ...position,
    direction: 'v'
  })
}

export const moveCube = ({ map, path, start }, cube, mode = '') => {
  return path.split(/([RL]|\d+)/g).reduce((acc, cmd) => {
    if (cmd) {
      console.log('### move cube cmd', cmd)
      const { x, y, direction } = updateCubePosition(map, cmd, acc.x, acc.y, acc.direction, cube, mode)

      console.log('### upd x,y, direction', x, y, direction)

      return {
        x,
        y,
        direction
      }
    }


    return acc
  }, {
    ...start,
    direction: '>'
  })
}

export const buildCubeModel = (mode = '') => {
  const boundaries = getFacesBoundaries(mode)

  const face1 = {
    nextRightCell: (x, y) => {
      return {
        x: x + 1,
        y,
        direction: '>'
      }
    },
    nextLeftCell: (x, y) => {
      if (x === boundaries[1][0]) {  //  min x
        return {
          x: boundaries[5][0],  //  min x
          y: boundaries[5][3] - y,
          direction: '>'
        }
      } else {
        return {
          x: x - 1,
          y,
          direction: '<'
        }
      }
    },
    nextUpCell: (x, y) => {
      if (y === boundaries[1][1]) {    //  min y
        return {
          x: boundaries[4][0],
          y: (x - boundaries[1][0]) + boundaries[4][1],
          direction: '>'
        }
      } else {
        return {
          x,
          y: y - 1,
          direction: '^'
        }
      }
    },
    nextDownCell: (x, y) => {
      return {
        x,
        y: y + 1,
        direction: 'v'
      }
    }
  }

  const face2 = {
    nextRightCell: (x, y) => {
      if (x === boundaries[2][2]) {  //  max x
        return {
          x: boundaries[6][2],  //  face 6 max x
          y: boundaries[6][3] - (y - boundaries[2][1]), //  face 6 max y, face 2 min y
          direction: '<'
        }

      } else {
        return {
          x: x + 1,
          y,
          direction: '>'
        }
      }
    },
    nextLeftCell: (x, y) => {
      return {
        x: x - 1,
        y,
        direction: '<'
      }
    },
    nextUpCell: (x, y) => {
      if (y === boundaries[2][1]) { // face 2 min y
        return {
          x: boundaries[4][0] + (x - boundaries[2][0]), //  face 4 min x, face 2 min x
          y: boundaries[4][3],  //  face 4 max y
          direction: '^'
        }
      } else {
        return {
          x,
          y: y - 1,
          direction: '^'
        }
      }

    },
    nextDownCell: (x, y) => {
      if (y === boundaries[2][3]) {
        return {
          x: boundaries[3][3],
          y: (x - boundaries[2][0]) + boundaries[3][1],
          direction: '<'
        }
      } else {
        return {
          x,
          y: y + 1,
          direction: 'v'
        }
      }
    }
  }

  const face3 = {
    nextRightCell: (x, y) => {
      if (x === boundaries[3][2]) {
        return {
          x: (y - boundaries[3][1]) + boundaries[2][0],
          y: boundaries[2][3],
          direction: '^'
        }
      } else {
        return {
          x: x + 1,
          y,
          direction: '>'
        }
      }
    },
    nextLeftCell: (x, y) => {
      if (x === boundaries[3][0]) {
        return {
          x: (y - boundaries[3][1]) + boundaries[5][0],
          y: boundaries[5][1],
          direction: 'v'
        }

      } else {
        return {
          x: x - 1,
          y,
          direction: '<'
        }
      }

    },
    nextUpCell: (x, y) => {
      return {
        x,
        y: y - 1,
        direction: '^'
      }
    },
    nextDownCell: (x, y) => {
      return {
        x,
        y: y + 1,
        direction: 'v'
      }
    }
  }

  const face4 = {
    nextRightCell: (x, y) => {
      if (x === boundaries[4][2]) {
        return {
          x: (y - boundaries[4][1]) + boundaries[6][0],
          y: boundaries[6][3],
          direction: '^'
        }
      } else {
        return {
          x: x + 1,
          y,
          direction: '>'
        }
      }
    },
    nextLeftCell: (x, y) => {
      if (x === boundaries[4][0]) {
        return {
          x: (y - boundaries[4][1]) + boundaries[1][0],
          y: boundaries[1][1],
          direction: 'v'
        }
      } else {
        return {
          x: x - 1,
          y,
          direction: '<'
        }
      }
    },
    nextUpCell: (x, y) => {
      return {
        x,
        y: y - 1,
        direction: '^'
      }
    },
    nextDownCell: (x, y) => {
      if (y === boundaries[4][3]) {
        return {
          x: (x - boundaries[4][0]) + boundaries[2][0],
          y: boundaries[2][1],
          direction: 'v'
        }
      } else {
        return {
          x,
          y: y + 1,
          direction: 'v'
        }
      }
    },
  }

  const face5 = {
    nextRightCell: (x, y) => {
      return {
        x: x + 1,
        y,
        direction: '>'
      }
    },
    nextLeftCell: (x, y) => {
      if (x === boundaries[5][0]) {
        return {
          x: boundaries[1][0],
          y: boundaries[1][1] + (boundaries[5][3] - y),
          direction: '>'
        }
      } else {
        return {
          x: x - 1,
          y,
          direction: '<'
        }
      }
    },
    nextUpCell: (x, y) => {
      if (y === boundaries[5][1]) {
        return {
          x: boundaries[3][0],
          y: (x - boundaries[5][0]) + boundaries[3][1],
          direction: '>'
        }
      } else {
        return {
          x,
          y: y - 1,
          direction: '^'
        }
      }
    },
    nextDownCell: (x, y) => {
      return {
        x,
        y: y + 1,
        direction: 'v'
      }
    }
  }

  const face6 = {
    nextRightCell: (x, y) => {
      if (x === boundaries[6][2]) {
        return {
          x: boundaries[2][2],
          y: (boundaries[6][3] - y) + boundaries[2][1],
          direction: '<'
        }

      } else {
        return {
          x: x + 1,
          y,
          direction: '>'
        }
      }
    },
    nextLeftCell: (x, y) => {
      return {
        x: x - 1,
        y,
        direction: '<'
      }
    },
    nextUpCell: (x, y) => {
      return {
        x,
        y: y - 1,
        direction: '^'
      }
    },
    nextDownCell: (x, y) => {
      if (y === boundaries[6][3]) {
        return {
          x: boundaries[4][2],
          y: (x - boundaries[6][0]) + boundaries[4][1],
          direction: '<'
        }

      } else {
        return {
          x,
          y: y + 1,
          direction: 'v'
        }
      }
    }
  }

  return {
    1: face1, 2: face2, 3: face3, 4: face4, 5: face5, 6: face6
  }
}

export const part2 = (input, mode = '') => {
  const model = parseInput(input)
  const cube = buildCubeModel(mode)
  const { x, y, direction } = moveCube(model, cube, mode)
  //
  const result = 1000 * (y + 1) + 4 * (x + 1) + directionScore[direction]


  return result

}