
export const parseInput = data => {
  return data.split(/\n/).reduce((acc, line, row) => {
    const lineItems = line.split('').reduce((lineacc, o, col) => {
      return o === '#' ? [...lineacc, { x: col, y: row }] : lineacc
    }, [])
    return [...acc, ...lineItems]

  }, [])
}



export const getNewPosition = ({ x, y }, items, directions) => {
  return directions.reduce((proposed, direction) => {
    if (proposed === undefined) {
      switch (direction) {
        case 'N':
          const fN = items.find(i => Math.abs(i.x - x) <= 1 && (i.y - y) === -1)
          if (fN === undefined) {
            return {
              x,
              y: y - 1
            }
          }
          break
        case 'E':
          const fE = items.find(i => (i.x - x) === 1 && Math.abs(i.y - y) <= 1)
          if (fE === undefined) {
            return {
              x: x + 1,
              y
            }
          }
          break
        case 'S':
          const fS = items.find(i => Math.abs(i.x - x) <= 1 && (i.y - y) === 1)
          if (fS === undefined) {
            return {
              x,
              y: y + 1
            }
          }
          break
        case 'W':
          const fW = items.find(i => (i.x - x) === -1 && Math.abs(i.y - y) <= 1)
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

  return items.map(({ x, y }) => {
    //
    const canMove = items.find(i => Math.abs(i.x - x) === 1 && Math.abs(i.y - y) === 1) === undefined
    //
    if (canMove) {
      const newPosition = getNewPosition({ x, y }, items, directions)
      return {
        x, y,
        proposed: newPosition
      }
    }
    return { x, y, proposed: {} }
  })
}

export const doRoundSecondHalf = items => {
  return items.map(({ x, y, proposed }) => {
    const sameMove = items.filter(i => i.proposed.x === proposed.x && i.proposed.y === proposed.y)
    if (sameMove.length === 1) {
      return {
        x: proposed.x,
        y: proposed.y,
        proposed
      }
    }

    return {
      x, y, proposed
    }

  })
}

export const solve = (items, rounds) => {
  return Array.from({ length: rounds }).reduce((acc, _) => {
    const withProposedPositions = doRoundFirstHalf(acc.items, acc.directions)
    console.log('### solve withProposedPositions', withProposedPositions)
    const newItems = doRoundSecondHalf(withProposedPositions)

    return {
      items: newItems,
      directions: [...acc.directions.slice(1, 4), acc.directions[0]]
    }

  }, {
    items,
    directions: ['N', 'S', 'W', 'E']
  })

}

export const part1 = input => {
  const items = parseInput(input)


  const result = solve(items, 10)


  console.log('### result', result)

  const [minx, miny, maxx, maxy] = result.items.reduce((acc, { x, y }) => {
    return [Math.min(acc[0], x), Math.min(acc[1], y), Math.max(acc[2], x), Math.max(acc[3], y)]

  }, [0, 0, 0, 0])

  console.log('### minx, miny, maxx, maxy', minx, miny, maxx, maxy)

  console.log('### area', (maxx - minx) * (maxy - miny))
  console.log('### part1res', ((maxx - minx) * (maxy - miny)) - result.items.length)

}

export const part2 = input => {

}