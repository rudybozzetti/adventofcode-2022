
export const blizzardTypes = ['<', '>', '^', 'v']

export const parseInput = input => {
  return input.split(/\n/).reduce((acc, line, rowIndex) => {
    const lineBlizzards = line.split('').reduce((blizzAcc, char, lineIndex) => {
      if (blizzardTypes.includes(char)) {
        return [
          ...blizzAcc,
          { dir: char, x: lineIndex, y: rowIndex }
        ]
      }
      return blizzAcc
    }, [])

    //
    if (rowIndex === 0) {
      const startX = line.indexOf('.')
      return {
        valley: {
          minx: 0,
          miny: 0,
          maxx: line.length - 1,
          start: { x: startX, y: 0 }
        },
        blizzards: [...acc.blizzards, ...lineBlizzards]
      }
    } else if ((line.match(/\./g) || []).length === 1) {
      const endX = line.indexOf('.')
      return {
        valley: {
          ...acc.valley,
          maxy: rowIndex,
          end: {
            x: endX, y: rowIndex
          }
        },
        blizzards: [...acc.blizzards, ...lineBlizzards]
      }
    }
    return {
      ...acc,
      blizzards: [...acc.blizzards, ...lineBlizzards]
    }
  }, { valley: {}, blizzards: [] })
}

export const updateBlizzards = ({ minx, miny, maxx, maxy }, blizzards) => {
  return blizzards.map(({ dir, x, y }) => {
    switch (dir) {
      case '>':
        return x + 1 === maxx ? {
          dir,
          x: minx + 1,
          y
        } : {
          dir,
          x: x + 1,
          y
        }

      case '<':
        return x - 1 === minx ? {
          dir,
          x: maxx - 1,
          y
        } : {
          dir,
          x: x - 1,
          y
        }

      case '^':
        return y - 1 === miny ? {
          dir,
          x,
          y: maxy - 1
        } : {
          dir,
          x,
          y: y - 1
        }

      case 'v':
        return y + 1 === maxy ? {
          dir,
          x,
          y: miny + 1
        } : {
          dir,
          x,
          y: y + 1
        }

    }

  })
}

const getVisitedKey = (x, y, blizzards) => {
  return JSON.stringify({ x, y, blizzards })
}

export const canGoRight = (x, y, blizzards, { minx, miny, maxx, maxy }) => {
  return (y !== miny) && (y !== maxy) && (x > minx) && (x < (maxx - 1)) && !blizzards.some(b => b.x === x + 1 && b.y === y)
}

export const canGoLeft = (x, y, blizzards, { minx, miny, maxx, maxy }) => {
  return (y !== miny) && (y !== maxy) && (x > (minx + 1)) && (x < maxx) && !blizzards.some(b => b.x === x - 1 && b.y === y)
}

export const canGoUp = (x, y, blizzards, { minx, miny, maxx, maxy }, start, end) => {
  return !(start.x === x && start.y === y - 1) && ((end.x === x && end.y === y - 1) || (y > (miny + 1)) && !blizzards.some(b => b.x === x && b.y === y - 1))
}

export const canGoDown = (x, y, blizzards, { minx, miny, maxx, maxy }, start, end) => {
  return !(start.x === x && start.y === y + 1) && ((end.x === x && end.y === y + 1) || (end.x === x && end.y === y) || (y < (maxy - 1)) && !blizzards.some(b => b.x === x && b.y === y + 1))
}

export const canWait = (x, y, blizzards) => {
  return !blizzards.some(b => b.x === x && b.y === y)
}


export const debug = ({ x, y }, { minx, miny, maxx, maxy }, blizzards, message = '') => {
  let result = ''
  for (let i = miny; i <= maxy; i++) {
    for (let j = minx; j <= maxx; j++) {
      if (x === j && y === i) {
        result += 'E'
      } else if (i === miny || i === maxy || j === minx || j === maxx) {
        result += '#'
      } else {
        const bz = blizzards.filter(b => b.x === j && b.y === i)
        if (bz.length === 0) {
          result += '.'

        } else if (bz.length === 1) {
          result += bz[0].dir
        } else {
          result += bz.length
        }
      }
    }
    result += "\n"
  }

  console.log(message)
  console.log(result)
}


export const solve = ({ start, end, ...bounds }, initialBlizzards, initialMoves = 0, reverse = false) => {
  const stack = [{
    x: start.x,
    y: start.y,
    moves: initialMoves,
    steps: []
  }]

  let bestMoves = Number.POSITIVE_INFINITY

  const visited = new Map()

  const bzcCacheSize = (bounds.maxx - bounds.minx - 1) * (bounds.maxy - bounds.miny - 1)
  const blizzardCache = Array.from({ length: bzcCacheSize })
  for (let i = 0; i < bzcCacheSize; i++) {
    blizzardCache[i] = i === 0 ? initialBlizzards : updateBlizzards(bounds, blizzardCache[i - 1])
  }

  while (stack.length > 0) {
    const { x, y, moves, steps } = stack.pop()
    //  console.log('### stack pop x, y', x, y, '### moves', moves, '### steps', steps)

    //  debug({ x, y }, bounds, blizzardCache[moves % bzcCacheSize], `minute ${moves}`)

    const bz = blizzardCache[moves % bzcCacheSize]
    const ahiahiahi = bz.some(b => b.x === x && b.y === y)
    if (ahiahiahi) {
      console.log('### fuck! at', moves, "x,y", x, y, 'bz', bz, 'steps', steps)

    }

    if (moves > 100000) {
      break
    }

    //
    if (moves > bestMoves) {
      //  console.log('### moves > bestMoves', moves, '>', bestMoves, '>>> exit')
      continue
    }

    const newSteps = [...steps, { x, y }]

    //
    const nextBlizzards = blizzardCache[(moves + 1) % bzcCacheSize]
    //  console.log('### nextBlizzards', nextBlizzards)
    //
    const visitedKey = getVisitedKey(x, y, (moves + 1) % bzcCacheSize)
    if (visited.has(visitedKey)) {
      //  console.log('### already visited', visitedKey)
      continue
    }
    visited.set(visitedKey)

    //
    //  debug({ x, y }, bounds, nextBlizzards, `round ${moves} updated`)

    //
    if (x === end.x && y === end.y) {
      //  console.log('### found exit in moves', moves)
      if (moves < bestMoves) {
        //  console.log('### new best moves', moves)
        bestMoves = moves
      }
      continue
    }

    //  nop action
    //  console.log('### try nop')
    if (canWait(x, y, nextBlizzards)) {
      //  console.log('### try nop')
      stack.push({
        x, y, moves: moves + 1, steps: newSteps
      })
    }

    //  try '<'
    if (canGoLeft(x, y, nextBlizzards, bounds)) {
      //  console.log('### try <')
      stack.push({
        x: x - 1, y, moves: moves + 1, steps: newSteps
      })
    }

    //  try '^'
    if (canGoUp(x, y, nextBlizzards, bounds, start, end)) {
      //  console.log('### try ^')
      stack.push({
        x, y: y - 1, moves: moves + 1, steps: newSteps
      })
    }

    //  try '>'
    if (canGoRight(x, y, nextBlizzards, bounds)) {
      //  console.log('### try >')
      stack.push({
        x: x + 1, y, moves: moves + 1, steps: newSteps
      })
    }

    //  try 'v'
    if (canGoDown(x, y, nextBlizzards, bounds, start, end)) {
      //  console.log('### try v')
      stack.push({
        x, y: y + 1, moves: moves + 1, steps: newSteps
      })
    }



  }

  return bestMoves
}

export const part1 = input => {
  const { valley, blizzards } = parseInput(input)

  const result = solve(valley, blizzards)

  return result
}



export const part2 = input => {
  const { valley, blizzards } = parseInput(input)

  /*
  
    const p1 = solve(valley, blizzards)
    console.log('### p1', p1)
  
    const p2 = solve({
      ...valley,
      start: { ...valley.end },
      end: { ...valley.start }
    }, blizzards, p1)
    console.log('### p2', p2)
  
    const p3 = solve(valley, blizzards, p2)
    console.log('### p3', p3)
  
  
  
    return p1 + p2 + p3
    */
}