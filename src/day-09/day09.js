

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

export const farRight = (knot, precedingKnot) => {
  return (precedingKnot[0] - knot[0]) > 1 && (precedingKnot[1] - knot[1]) === 0
}

export const farLeft = (knot, precedingKnot) => {
  return (precedingKnot[0] - knot[0]) < -1 && (precedingKnot[1] - knot[1]) === 0
}

export const farUp = (knot, precedingKnot) => {
  return (precedingKnot[1] - knot[1]) > 1 && (precedingKnot[0] - knot[0]) === 0
}

export const farDown = (knot, precedingKnot) => {
  return ((precedingKnot[1] - knot[1])) < -1 && (precedingKnot[0] - knot[0]) === 0
}


export const getDistanceV = ([kx, ky], [pkx, pky]) => {
  return [pkx - kx, pky - ky]
}

//
export const moveKnot = (knot, precedingKnot, direction) => {

  if (precedingKnot) {
    const distance = getDistance(precedingKnot, knot)

    //  console.log('### distance', distance, knot, precedingKnot)
    const fRight = farRight(knot, precedingKnot)
    const fLeft = farLeft(knot, precedingKnot)
    const fUp = farUp(knot, precedingKnot)
    const fDown = farDown(knot, precedingKnot)

    const [dx, dy] = getDistanceV(knot, precedingKnot)


    const nextPosition = fRight ? [precedingKnot[0] - 1, knot[1]] :
      fLeft ? [precedingKnot[0] + 1, knot[1]] :
        fUp ? [knot[0], precedingKnot[1] - 1] :
          fDown ? [knot[0], precedingKnot[1] + 1] :
            distance > Math.SQRT2 && dx > 0 && dy > 0 ? [knot[0] + 1, knot[1] + 1] :
              distance > Math.SQRT2 && dx < 0 && dy > 0 ? [knot[0] - 1, knot[1] + 1] :
                distance > Math.SQRT2 && dx > 0 && dy < 0 ? [knot[0] + 1, knot[1] - 1] :
                  distance > Math.SQRT2 && dx < 0 && dy < 0 ? [knot[0] - 1, knot[1] - 1]
                    : knot

    return nextPosition
  } else {
    const nextPosition = [
      direction === 'R' ? knot[0] + 1 : direction === 'L' ? knot[0] - 1 : knot[0],
      direction === 'U' ? knot[1] + 1 : direction === 'D' ? knot[1] - 1 : knot[1],
    ]
    return nextPosition
  }

}

export const moveKnots = (initialKnots, direction, amount) => {
  return Array.from({ length: amount }).reduce(({ knots, visited }, _) => {
    //const nextPosition = singleMove(position, direction)


    const newPositions = knots.reduce((acc, knot, index) => {
      //  console.log('### moveKnot knot', knot, 'prec', index === 0 ? null : acc[acc.length - 1])
      const newKnotPos = moveKnot(knot, index === 0 ? null : acc[acc.length - 1], direction)
      //  console.log('### moveKnot knot result', newKnotPos)



      return [
        ...acc,
        newKnotPos
      ]
    }, [])

    //  console.log('### newPositions after ', direction, amount, '#', newPositions)
    //
    const newVisited = newPositions[newPositions.length - 1].join(',')
    //
    return {
      knots: newPositions,
      visited: Array.from(new Set([...visited, newVisited]))
    }
  }, {
    knots: initialKnots,
    visited: []
  })
}


export const part2 = data => {
  const moves = buildMoves(data)

  const initialKnots = Array.from({ length: 10 }).map(x => ([11, 5]))


  const { visited } = moves.reduce((acc, [direction, amount]) => {
    const {
      knots,
      visited
    } = moveKnots(acc.knots, direction, amount)


    return {
      knots,
      visited: [...acc.visited, ...visited]
    }
  }, {
    knots: initialKnots,
    visited: []
  })


  //  console.log('### visited', visited)

  const singleVisited = new Set(visited)
  //  console.log('### singleVisited', singleVisited)

  return singleVisited.size
}