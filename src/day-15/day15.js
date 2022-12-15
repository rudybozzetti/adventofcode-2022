

export const parseInput = input => {

  const re = /Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)/g

  return input.split(/\n/).reduce((acc, line) => {
    const [_, Sx, Sy, Bx, By] = [...line.matchAll(re)].pop()

    const dist = Math.abs(Sy - By) + Math.abs(Sx - Bx)

    return [
      ...acc,
      {
        S: `${Sx},${Sy}`,
        B: `${Bx},${By}`,
        dist
      }
    ]

  }, [])
}

export const findMaxDist = map => {
  return map.reduce((prev, m) => {
    return Math.max(prev, m.dist)
  }, 0)
}

export const findMinMaxX = map => {
  return map.reduce(([prevMin, prevMax], { S, B }) => {
    const Sx = S.split(',').map(x => parseInt(x))[0]
    const Bx = B.split(',').map(x => parseInt(x))[0]
    return [Math.min(prevMin, Sx, Bx), Math.max(prevMax, Sx, Bx)]
  }, [0, 0])
}

export const calcDist = ([ax, ay], [bx, by]) => Math.abs(ax - bx) + Math.abs(ay - by)

export const findBeaconsPositition = map => {

  return map.map(({ B }) => B)
}

export const findPositions = (map, y) => {
  const maxDist = findMaxDist(map)
  const [minX, maxX] = findMinMaxX(map)
  const beacons = findBeaconsPositition(map)

  console.log('### beacons', beacons)
  //

  const matches = new Set()

  for (let x = minX - maxDist; x <= maxX + maxDist; x++) {
    //  console.log('### x', x)
    const coords = `${x},${y}`

    //
    if (beacons.includes(coords)) {
      continue;
    }

    //

    const match = map.some(({ S, B, dist }) => {
      const [Sx, Sy] = S.split(',').map(x => parseInt(x))
      const pointToSensorDist = calcDist([Sx, Sy], [x, y])
      //console.log('### pointToSensorDist', pointToSensorDist)

      return pointToSensorDist <= dist
    })

    //  console.log('### match for ', x, ',', y, ':', match)

    if (match) {
      matches.add(coords)
    }


  }


  return Array.from(matches)
}

export const part1 = (input, y) => {
  const map = parseInput(input)
  console.log('### map', map)
  const matches = findPositions(map, y)
  //

  return matches.length
}