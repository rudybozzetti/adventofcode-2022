

export const buildMoves = data => {
  return data.split(/\n/).reduce((acc, line) => (
    [...acc, line.split(/\s+/).map(
      (c, index) => index === 1 ? parseInt(c) : c

    )]
  ), [])
}

export const move = (initial, direction, amount) => {
  return Array.from({ length: amount }).reduce(({ position, visited }, _) => {
    const nextPosition = singleMove(position, direction)

    return {
      position: nextPosition,
      visited: [...visited, nextPosition['T']]
    }
  }, {
    position: initial,
    visited: []
  })
}

export const getDistance = ([Hx, Hy], [Tx, Ty]) => {
  return Math.sqrt((Hx - Tx) * (Hx - Tx) + (Hy - Ty) * (Hy - Ty))
}

export const singleMove = ({ H, T }, direction) => {
  const nextH = [
    direction === 'R' ? H[0] + 1 : direction === 'L' ? H[0] - 1 : H[0],
    direction === 'U' ? H[1] + 1 : direction === 'D' ? H[1] - 1 : H[1],
  ]
  const distance = getDistance(nextH, T)

  const nextT = distance > Math.SQRT2 ? [
    direction === 'R' ? nextH[0] - 1 : direction === 'L' ? nextH[0] + 1 : nextH[0],
    direction === 'U' ? nextH[1] - 1 : direction === 'D' ? nextH[1] + 1 : nextH[1]
  ] : T

  /* console.log('### distance', distance)
  console.log('### nextH', nextH)
  console.log('### nextT', nextT) */

  return {
    H: nextH,
    T: nextT
  }
}

export const getSingleVisited = visited => {
  return Array.from(new Set(visited.map(([x, y]) => `${x},${y}`)))
}

export const part1 = data => {
  const moves = buildMoves(data)
  const { visited } = moves.reduce((acc, [direction, amount]) => {
    const {
      position,
      visited
    } = move(acc.position, direction, amount)

    return {
      position,
      visited: [...acc.visited, ...visited]

    }
  }, {
    position: { H: [0, 0], T: [0, 0] },
    visited: []
  })



  const singleVisited = getSingleVisited(visited)

  return singleVisited.length

}

export const part2 = data => {

}