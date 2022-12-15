
const fs = require('fs');
const path = require('path')

export const pointsHorz = (map, a, b) => {

  if (a[0] > b[0]) {
    for (let x = b[0]; x <= a[0]; x++) {
      map.set(`${x},${a[1]}`, '#')
    }
  } else {
    for (let x = a[0]; x <= b[0]; x++) {
      map.set(`${x},${a[1]}`, '#')
    }
  }


}

export const pointsVert = (map, a, b) => {

  if (a[1] > b[1]) {
    for (let y = b[1]; y <= a[1]; y++) {
      map.set(`${a[0]},${y}`, '#')
    }
  } else {
    for (let y = a[1]; y <= b[1]; y++) {
      map.set(`${a[0]},${y}`, '#')
    }
  }

  return map
}

export const pointsInLine = (map, a, b) => {
  return a[0] === b[0] ? pointsVert(map, a, b) : pointsHorz(map, a, b)
}

export const rocksInVector = (line, map) => {

  line.split(/\s+->\s+/).reduce((prevToken, token) => {
    const [prevX, prevY] = prevToken.split(',').map(o => parseInt(o))
    const [x, y] = token.split(',').map(o => parseInt(o))

    pointsInLine(map, [prevX, prevY], [x, y])

    return token

  })

  return map
}

export const buildMap = (input) => {
  const map = new Map()
  input.split(/\n/).forEach((line) => {

    rocksInVector(line, map)

  })

  return map
}

export const findBottom = map => {

  let max = parseInt(map.keys().next().value.split(',')[1])

  for (const k of map.keys()) {

    max = Math.max(max, parseInt(k.split(',')[1]))
  }

  return max

}

export const moveSand = (map, sandOrigin, bottom) => {

  const sand = Array.from({ length: bottom }).reduce((startingPoint, _) => {
    const trydown = [startingPoint[0], startingPoint[1] + 1]
    const tryleft = [startingPoint[0] - 1, startingPoint[1] + 1]
    const tryright = [startingPoint[0] + 1, startingPoint[1] + 1]

    if (map.has(`${trydown[0]},${trydown[1]}`)) {
      //  down è occupato
      if (map.has(`${tryleft[0]},${tryleft[1]}`)) {
        // down left è occupato
        if (map.has(`${tryright[0]},${tryright[1]}`)) {
          //  down right è occupato
          return startingPoint
        }

        // down right è libero
        return tryright
      }

      //  down left è libero
      return tryleft
    }

    //  down è libero
    return trydown

  }, sandOrigin)

  return sand
}

export const moveSand2 = (map, sandOrigin, bottom) => {

  const sand = Array.from({ length: bottom + 1 }).reduce((startingPoint, _) => {
    const trydown = [startingPoint[0], startingPoint[1] + 1]
    const tryleft = [startingPoint[0] - 1, startingPoint[1] + 1]
    const tryright = [startingPoint[0] + 1, startingPoint[1] + 1]

    if (map.has(`${trydown[0]},${trydown[1]}`)) {
      //  down è occupato
      if (map.has(`${tryleft[0]},${tryleft[1]}`)) {
        // down left è occupato
        if (map.has(`${tryright[0]},${tryright[1]}`)) {
          //  down right è occupato
          return startingPoint
        }

        // down right è libero
        if (tryright[1] >= bottom) {

          return startingPoint
        }
        return tryright
      }

      //  down left è libero
      if (tryleft[1] >= bottom) {

        return startingPoint
      }
      return tryleft
    }

    //  down è libero
    if (trydown[1] >= bottom) {

      return startingPoint
    }
    return trydown

  }, sandOrigin)

  return sand
}

const debug = (map) => {


  let minx, maxx, miny, maxy = undefined


  for (const c of map.keys()) {
    const [x, y] = c.split(',').map(o => parseInt(o))
    minx = minx === undefined ? x : Math.min(minx, x)
    maxx = maxx === undefined ? x : Math.max(maxx, x)

    miny = miny === undefined ? y : Math.min(miny, y)
    maxy = maxy === undefined ? y : Math.max(maxy, y)
  }


  const tmp = []


  for (let i = 0; i < (maxy - miny) + 2; i++) {
    const row = []
    for (let j = 0; j < (maxx - minx) + 2; j++) {
      const coords = `${minx + j},${miny + i}`
      if (map.has(coords)) {
        row.push(map.get(coords))
      } else {
        row.push('.')
      }
    }
    tmp.push(row)
  }

  const stream = tmp.reduce((acc, row) => {

    return acc + "\n" + row.join('')
  }, [])

  //  console.log('### debug', stream)
  fs.writeFile(path.resolve(__dirname, 'debug.txt'), "\n===\n\n" + stream, { flag: 'a+' }, (err) => {
    if (err) {
      console.error('### error', err)
    }

  })

}

export const part1 = (input, sandOrigin) => {
  const map = buildMap(input)

  const bottom = findBottom(map)

  let i = 0

  while (true) {
    const sand = moveSand(map, sandOrigin, bottom)

    if (sand[1] >= bottom) {
      break
    }

    map.set(`${sand[0]},${sand[1]}`, 'o')

    i++

  }

  return i
}

export const part2 = (input, sandOrigin) => {
  const map = buildMap(input)

  const limitY = findBottom(map)


  const bottom = limitY + 2


  let i = 0

  while (true) {
    const sand = moveSand2(map, sandOrigin, bottom)


    if (sand[0] === sandOrigin[0] && sand[1] === sandOrigin[1]) {
      map.set(`${sand[0]},${sand[1]}`, 'o')
      i++
      break
    }

    if (sand[1] < bottom) {
      map.set(`${sand[0]},${sand[1]}`, 'o')
    }

    i++

  }

  //  debug(map)

  return i

}