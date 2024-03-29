

export const parseInput = input => {

  const re = /Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)/g

  return input.split(/\n/).reduce((acc, line) => {
    const [_, Sx, Sy, Bx, By] = [...line.matchAll(re)].pop()

    const dist = Math.abs(Sy - By) + Math.abs(Sx - Bx)

    return [
      ...acc,
      {
        S: { x: parseInt(Sx), y: parseInt(Sy) },
        B: { x: parseInt(Bx), y: parseInt(By) },
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
    return [Math.min(prevMin, S.x, B.x), Math.max(prevMax, S.x, B.x)]
  }, [0, 0])
}

export const calcDist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

export const findBeaconsPositition = map => {
  return map.map(({ B }) => B)
}

export const findPositions = (map, y) => {
  const maxDist = findMaxDist(map)
  const [minX, maxX] = findMinMaxX(map)
  const beacons = findBeaconsPositition(map)
  //

  const matches = new Set()

  for (let x = minX - maxDist; x <= maxX + maxDist; x++) {
    //  console.log('### x', x)
    const coords = `${x},${y}`

    //
    if (beacons.find(b => b.x === x && b.y === y)) {
      continue;
    }

    //

    const match = map.some(({ S, B, dist }) => {
      const pointToSensorDist = calcDist(S, { x, y })
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

  const matches = findPositions(map, y)
  //

  return matches.length
}

export const findBeacon = (map, xmin, ymin, xmax, ymax) => {

  const beacons = findBeaconsPositition(map)

  for (let x = xmin; x <= xmax; x++) {
    for (let y = ymin; y <= ymax; y++) {
      //

      if (beacons.find(b => b.x === x && b.y === y)) {
        continue;
      }

      const match = !map.some(({ S, dist }) => {
        const _dist = calcDist({ x, y }, S)
        //  console.log('### dist', _dist)

        return _dist <= dist
      })

      if (match) {
        

        return { x, y }
      }


      /*
      if (x === 14 && y === 11) {
        console.log('### x 14 y 11 m', m)
      }
      */

      /*
      if (m) {
        console.log('### m', m, x, y)
      }
      */


      //
    }
  }

}

export const sensorsDiamonds = map => {


}

/**
 * bordy esterni sono 4 rette
 * y = mx + q dove m è +-1
 * quindi y = x + q oppure y = -x + q
 * punti noti sono (Sx - dist -1, Sy) e (Sx + dist +1, Sy)
 * //
 * le prime due q sono con m=1
 * le ultime due con m=-1
 */
export const getOuterLines = ({ S, dist }) => {
  const q1 = S.y - S.x + dist +1
  const q2 = S.y - S.x - dist - 1
  const q3 = S.y + S.x - dist -1
  const q4 = S.y + S.x + dist + 1
  //
  return [q1, q2, q3, q4]


}

export const part2 = (input, xmin, ymin, xmax, ymax) => {
  const map = parseInput(input)

  //  const { x, y } = findBeacon(map, xmin, ymin, xmax, ymax)

  //  return x * 4000000 + y

  const sensorsWidthOuterLines = map.map(o => ({
    ...o,
    outer: getOuterLines(o),

  }))

  //  console.log('### sensorsWidthOuterLines', sensorsWidthOuterLines)

  const [uplines, downlines] = sensorsWidthOuterLines.reduce((acc, {outer}) => {
    return [
      [...acc[0], outer[0], outer[1]],
      [...acc[1], outer[2], outer[3]],      
    ]

  }, [[],[]])

  //  console.log('### downlines',downlines)
  //  console.log('### uplines',uplines)

  //  trovo intersezioni
  // y = x + q per le upwards
  // y = -x + q per le downwards
  // y = x + u = -x + d
  // x = (d - u)/2
  for(const d of downlines) {
    for(const u of uplines) {
      const x = (d - u) / 2

      if(!Number.isInteger(x)) {
        continue
      }
      
      const y = x + u

      if(x < xmin || x > xmax || y < ymin || y > ymax) {
        continue
      }

      const pointInSensor = map.find(({S, dist}) => {
        return calcDist(S, {x,y}) <= dist
      })

      if(!pointInSensor) {
        //  gotcha!
        return x * 4000000 + y
      }


    }
  }

 


  

}


/*
for (let y = ymin; y <= ymax; y++) {


    console.log('### y', y)


    const sensorsCanIntersectY = map.filter(({ S, dist }) => {
      return S.y - dist <= y && y <= S.y + dist
    })

    //  console.log('### sensorsCanIntersectY', y, sensorsCanIntersectY)

    if (!sensorsCanIntersectY.length) {
      continue
    }

    //

    const xIntervals = sensorsCanIntersectY.reduce((acc, { S, dist }) => {
      const startX = Math.max(xmin, S.x - dist + Math.abs(S.y - y))
      const endX = Math.min(xmax, S.x + dist - Math.abs(S.y - y))


      for (let x = startX; x <= endX; x++) {
        acc.add(x)
      }

      return acc


    }, new Set())

    if (xIntervals.size < (xmax - xmin + 1)) {
      //  hole
      console.log('### xIntervals hole', xIntervals)
      for (let x = xmin; x <= xmax; x++) {
        if (!xIntervals.has(x)) {
          console.log('### hhoho', x)


          return x * 4000000 + y
        }
      }


    }




    // console.log('### xIntervals', y, '#', xIntervals)

  }

*/