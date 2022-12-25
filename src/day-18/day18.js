
export const buildModel = input => {
  return input.split(/\n/).reduce(({ map, max, min }, line) => {
    const xyz = line.split(',').map(x => parseInt(x))
    return {
      map: [...map, xyz],
      max: {
        x: Math.max(max.x, xyz[0]),
        y: Math.max(max.y, xyz[1]),
        z: Math.max(max.z, xyz[2]),
      },
      min: {
        x: Math.min(min.x, xyz[0]),
        y: Math.min(min.y, xyz[1]),
        z: Math.min(min.z, xyz[2])
      }
    }
  }, { map: [], max: { x: 0, y: 0, z: 0 }, min: { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY, z: Number.POSITIVE_INFINITY } })
}



export const part1 = (input) => {
  const { map, max, min } = buildModel(input)
  //
  const touchingFaces = map.reduce((acc, [x, y, z]) => {
    const testxp1 = map.find(o => o[0] === x + 1 && o[1] === y && o[2] === z)
    const testxm1 = map.find(o => o[0] === x - 1 && o[1] === y && o[2] === z)
    const testyp1 = map.find(o => o[0] === x && o[1] === y + 1 && o[2] === z)
    const testym1 = map.find(o => o[0] === x && o[1] === y - 1 && o[2] === z)
    const testzp1 = map.find(o => o[0] === x && o[1] === y && o[2] === z + 1)
    const testzm1 = map.find(o => o[0] === x && o[1] === y && o[2] === z - 1)

    return acc + (!!testxp1 ? 1 : 0) + (!!testxm1 ? 1 : 0) + (!!testyp1 ? 1 : 0) + (!!testym1 ? 1 : 0) + (!!testzp1 ? 1 : 0) + (!!testzm1 ? 1 : 0)


  }, 0)

  console.log('### total elements', map.length)
  console.log('### total faces', map.length * 6)
  console.log('### touching faces', touchingFaces)
  console.log('### max', max)
  console.log('### min', min)

  return map.length * 6 - touchingFaces
}

export const floodFillRecursive = (map, min, max, { x, y, z }, acc) => {
  //  console.log('### floodFill x', x, 'y', y, 'z', z)

  //  se fuori da bounding box, esci
  if (x < min.x || x > max.x || y < min.y || y > max.y || z < min.z || z > max.z) {
    console.log('### x,y,z', x, y, z, 'out of bounds')
    return
  }

  //  se già in acc, esci
  if (acc.find(o => o.x === x && o.y === y && o.z === z)) {
    return
  }

  //  se non fa parte della parte solida, aggiungi ad acc
  if (!map.find(o => o[0] === x && o[1] === y && o[2] === z)) {
    acc.push({ x, y, z })
  }

  floodFill(map, min, max, {
    x: x + 1, y, z
  }, acc)

  floodFill(map, min, max, {
    x: x - 1, y, z
  }, acc)

  floodFill(map, min, max, {
    x, y: y + 1, z
  }, acc)

  floodFill(map, min, max, {
    x, y: y - 1, z
  }, acc)



  floodFill(map, min, max, {
    x, y, z: z + 1
  }, acc)

  floodFill(map, min, max, {
    x, y, z: z - 1
  }, acc)


  return acc


}

export const validCoordinates = (min, max, { x, y, z }, acc, map) => {
  //  se fuori da bounding box, esci
  if (x < min.x || x > max.x || y < min.y || y > max.y || z < min.z || z > max.z) {
    //  console.log('### x,y,z', x, y, z, 'out of bounds')
    return false
  }

  if (acc.find(o => o.x === x && o.y === y && o.z === z)) {
    //  console.log('### x,y,z', x, y, z, 'already in acc')
    return false
  }

  if (map.find(([xa, ya, za]) => x === xa && y === ya && z === za)) {
    //  console.log('### x,y,z', x, y, z, 'already in map')
    return false
  }

  return true
}


export const findInStack = (stack, { x, y, z }) => {
  return stack.find(({ x: xa, y: ya, z: za }) => x === xa && y === ya && z === za)
}

/**
 * 
 * @param {Array} map list of solid elements
 * @param {*} min x,y,z of lower point, also starting point
 * @param {*} max x,y,z of higher point
 * @returns {Array} list of flooded elements
 */
export const floodFill = (map, min, max) => {
  const acc = []
  const fillStack = [min]
  //
  let i = 0;
  while (fillStack.length > 0) {

    const el = fillStack.pop();
    //  console.log('### el', el)

    if (!validCoordinates(min, max, el, acc, map)) {
      continue;
    }

    //  se non fa parte della parte solida, aggiungi ad acc
    if (!map.find(o => o[0] === el.x && o[1] === el.y && o[2] === el.z)) {
      //  console.log('### el ', el, 'not in map so push to acc')
      acc.push(el)
    }

    const xp1 = { ...el, x: el.x + 1 }
    const xm1 = { ...el, x: el.x - 1 }
    const yp1 = { ...el, y: el.y + 1 }
    const ym1 = { ...el, y: el.y - 1 }
    const zp1 = { ...el, z: el.z + 1 }
    const zm1 = { ...el, z: el.z - 1 }

    if (validCoordinates(min, max, xp1, acc, map) && !findInStack(fillStack, xp1)) {
      fillStack.push(xp1);
    }

    if (validCoordinates(min, max, xm1, acc, map) && !findInStack(fillStack, xm1)) {
      fillStack.push(xm1);
    }

    if (validCoordinates(min, max, yp1, acc, map) && !findInStack(fillStack, yp1)) {
      fillStack.push(yp1);
    }

    if (validCoordinates(min, max, ym1, acc, map) && !findInStack(fillStack, ym1)) {
      fillStack.push(ym1);
    }

    if (validCoordinates(min, max, zp1, acc, map) && !findInStack(fillStack, zp1)) {
      fillStack.push(zp1);
    }

    if (validCoordinates(min, max, zm1, acc, map) && !findInStack(fillStack, zm1)) {
      fillStack.push(zm1);
    }


    //  fillStack.push({ x: el.x, y: el.y, z: el.z + 1 });
    //  fillStack.push({ x: el.x, y: el.y, z: el.z - 1 });

  }


  // console.log('### acc', acc)

  return acc
}

export const part2 = (input) => {
  const { map, max, min } = buildModel(input)
  console.log('### min max', min, max)
  //
  const newMin = {
    x: min.x - 1, y: min.y - 1, z: min.z - 1
  }

  const newMax = {
    x: max.x + 1, y: max.y + 1, z: max.z + 1
  }

  //
  const flooded = floodFill(map, newMin, newMax)

  const bboxVolume = (newMax.x + 1 - newMin.x) * (newMax.y + 1 - newMin.y) * (newMax.z + 1 - newMin.z)
  console.log('### bboxVolume', bboxVolume)
  console.log('### flooded num', flooded.length)
  //  console.log('### flooded', flooded)
  //  conto facce di flooded che toccano facce della parte solida
  const res = flooded.reduce((acc, { x, y, z }) => {
    const testxp1 = map.find(o => o[0] === x + 1 && o[1] === y && o[2] === z)
    const testxm1 = map.find(o => o[0] === x - 1 && o[1] === y && o[2] === z)
    const testyp1 = map.find(o => o[0] === x && o[1] === y + 1 && o[2] === z)
    const testym1 = map.find(o => o[0] === x && o[1] === y - 1 && o[2] === z)
    const testzp1 = map.find(o => o[0] === x && o[1] === y && o[2] === z + 1)
    const testzm1 = map.find(o => o[0] === x && o[1] === y && o[2] === z - 1)

    return acc + (!!testxp1 ? 1 : 0) + (!!testxm1 ? 1 : 0) + (!!testyp1 ? 1 : 0) + (!!testym1 ? 1 : 0) + (!!testzp1 ? 1 : 0) + (!!testzm1 ? 1 : 0)

  }, 0)

  console.log('### res', res)


  return res
}