
export const buildModel = input => {
  return input.split(/\n/).reduce(({ map, max }, line) => {
    const xyz = line.split(',').map(x => parseInt(x))
    return {
      map: [...map, xyz],
      max: {
        x: Math.max(max.x, xyz[0]),
        y: Math.max(max.y, xyz[1]),
        z: Math.max(max.z, xyz[2]),
      }
    }
  }, { map: [], max: { x: 0, y: 0, z: 0 } })
}



export const part1 = (input) => {
  const { map } = buildModel(input)
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

  console.log('### total faces', map.length * 6)
  console.log('### touching faces', touchingFaces)

  return map.length * 6 - touchingFaces
}

export const part2 = (input) => {

}