
export const parseInput = data => {
  return data.split(/\n/).reduce((acc, line, row) => {
    const lineItems = line.split('').reduce((lineacc, o, col) => {
      return o === '#' ? [...lineacc, { x: col, y: row }] : lineacc
    }, [])
    return [...acc, ...lineItems]

  }, [])
}

export const nearFinder = (x, y) => i => {
  const xDistance = Math.abs(i.x - x)
  const yDistance = Math.abs(i.y - y)
  return xDistance === 0 ? yDistance === 1 :
    yDistance === 0 ? xDistance === 1 :
      (xDistance === 1 && yDistance === 1)


}
export const Nfinder = (x, y) => i => (Math.abs(i.x - x) <= 1 && (i.y - y) === -1)
export const Efinder = (x, y) => i => (i.x - x) === 1 && Math.abs(i.y - y) <= 1
export const Sfinder = (x, y) => i => Math.abs(i.x - x) <= 1 && (i.y - y) === 1
export const Wfinder = (x, y) => i => (i.x - x) === -1 && Math.abs(i.y - y) <= 1


export const getNewPosition = ({ x, y }, items, directions) => {
  return directions.reduce((proposed, direction) => {
    if (proposed === undefined) {
      switch (direction) {
        case 'N':
          const fN = items.find(Nfinder(x, y))
          if (fN === undefined) {
            return {
              x,
              y: y - 1
            }
          }
          break
        case 'E':
          const fE = items.find(Efinder(x, y))
          if (fE === undefined) {
            return {
              x: x + 1,
              y
            }
          }
          break
        case 'S':
          const fS = items.find(Sfinder(x, y))
          if (fS === undefined) {
            return {
              x,
              y: y + 1
            }
          }
          break
        case 'W':
          const fW = items.find(Wfinder(x, y))
          if (fW === undefined) {
            return {
              x: x - 1,
              y
            }
          }
      }
    }

    return proposed
  }, undefined)
}

export const doRoundFirstHalf = (items, directions) => {
  //  console.log('### doRoundFirstHalf directions', directions)

  return items.map(({ x, y }) => {
    //
    const canMove = items.find(nearFinder(x, y)) !== undefined
    //
    if (canMove) {
      const newPosition = getNewPosition({ x, y }, items, directions)
      return {
        x, y,
        proposed: newPosition
      }
    }
    return { x, y }
  })
}

export const doRoundSecondHalf = items => {
  return items.map(({ x, y, proposed }) => {
    const sameMove = items.filter(i => !!proposed && !!i.proposed && i.proposed.x === proposed.x && i.proposed.y === proposed.y)
    if (sameMove.length === 1) {
      return {
        x: proposed.x,
        y: proposed.y,
      }
    }

    return {
      x, y, proposed
    }

  })
}

export const debugItems = (items, round) => {
  const [minx, miny, maxx, maxy] = items.reduce((acc, { x, y }) => {
    return [Math.min(acc[0], x), Math.min(acc[1], y), Math.max(acc[2], x), Math.max(acc[3], y)]

  }, [0, 0, 0, 0])


  let result = ''
  let charcode = 'A'.charCodeAt(0)
  for (let y = miny; y <= maxy; y++) {
    for (let x = minx; x <= maxx; x++) {
      if (items.find(o => o.x === x && o.y === y)) {
        result += String.fromCharCode(charcode);
        charcode++;
      } else {
        result += '.'
      }
    }
    result += "\n"
  }

  console.log('### result round ', round)
  console.log(result)
}

export const solve = (items, rounds) => {
  return Array.from({ length: rounds }).reduce((acc, _, round) => {
    const withProposedPositions = doRoundFirstHalf(acc.items, acc.directions)
    //  console.log('### solve withProposedPositions', withProposedPositions)
    const newItems = doRoundSecondHalf(withProposedPositions)

    //  debugItems(newItems, round + 1)

    return {
      items: newItems,
      directions: [...acc.directions.slice(1, 4), acc.directions[0]]
    }

  }, {
    items,
    directions: ['N', 'S', 'W', 'E']
  })

}

export const getBoundingBox = (items) => {
  return items.reduce((acc, { x, y }) => {
    return [Math.min(acc[0], x), Math.min(acc[1], y), Math.max(acc[2], x), Math.max(acc[3], y)]

  }, [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,])
}

export const part1 = input => {
  const items = parseInput(input)
  const result = solve(items, 10)

  //  console.log('### result', result)

  const [minx, miny, maxx, maxy] = getBoundingBox(result.items)

  const area = (maxx - minx + 1) * (maxy - miny + 1)
  return area - result.items.length

}

export const part2 = input => {

}