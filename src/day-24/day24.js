
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

export const solve = ({ start, end, ...bounds }, initialBlizzards) => {
  const stack = [{
    x: start.x,
    y: start.y,
    blizzards: initialBlizzards,
    moves: 0,
    steps: []
  }]

  let bestMoves = Number.POSITIVE_INFINITY

  const visited = new Map()

  while (stack.length > 0) {
    const { x, y, blizzards, moves, steps } = stack.pop()
    console.log('### stack pop x, y', x, y, '### moves', moves, '### steps', steps)

    if (moves > 100000) {
      break
    }

    //
    if (moves > bestMoves) {
      console.log('### moves > bestMoves', moves, '>', bestMoves, '>>> exit')
      continue
    }

    const newSteps = [...steps, { x, y }]

    //
    const nextBlizzards = updateBlizzards(bounds, blizzards)
    //  console.log('### nextBlizzards', nextBlizzards)
    //
    const visitedKey = getVisitedKey(x, y, nextBlizzards)
    if (visited.has(visitedKey)) {
      console.log('### already visited', visitedKey)
      continue
    }
    visited.set(visitedKey)

    //
    if (x === end.x && y === end.y) {
      console.log('### found exit in moves', moves)
      if (moves < bestMoves) {
        console.log('### new best moves', moves)
        bestMoves = moves
      }
      continue
    }

    //  try next is exit
    if (x === end.x && y + 1 === end.y) {
      console.log('### found exit')
      stack.push({
        x, y: y + 1, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
      })
      continue
    }

    //  nop action
    console.log('### try nop')
    stack.push({
      x, y, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
    })

    //  try '>'
    if (y > bounds.miny && x < (bounds.maxx - 1) && !nextBlizzards.some(b => b.x === x + 1 && b.y === y)) {
      console.log('### try >')
      stack.push({
        x: x + 1, y, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
      })
    }

    //  try '<'
    if (y > bounds.miny && x > (bounds.minx + 1) && !nextBlizzards.some(b => b.x === x - 1 && b.y === y)) {
      console.log('### try <')
      stack.push({
        x: x - 1, y, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
      })
    }

    //  try '^'
    if (y > (bounds.miny + 1) && !nextBlizzards.some(b => b.x === x && b.y === y - 1)) {
      console.log('### try ^')
      stack.push({
        x, y: y - 1, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
      })
    }

    //  try 'v'
    if (y < (bounds.maxy - 1) && !nextBlizzards.some(b => b.x === x && b.y === y + 1)) {
      console.log('### try v')
      stack.push({
        x, y: y + 1, blizzards: nextBlizzards, moves: moves + 1, steps: newSteps
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
}