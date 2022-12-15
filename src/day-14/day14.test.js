
import {
  pointsHorz,
  pointsVert, pointsInLine, buildMap,
  findBottom,
  part1,
  part2
} from './day14'

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

const testMap = new Map()
  ;
[
  '498,4', '498,5', '498,6',
  '496,6', '497,6', '503,4',
  '502,4', '502,5', '502,6',
  '502,7', '502,8', '502,9',
  '494,9', '495,9', '496,9',
  '497,9', '498,9', '499,9',
  '500,9', '501,9'
].forEach(x => testMap.set(x, '#'))



describe('day14', () => {

  it('pointsHorz', () => {
    const map = new Map()
    pointsHorz(map, [498, 6], [496, 6])

    expect(map.has('496,6')).toBeTruthy()
    expect(map.has('497,6')).toBeTruthy()
    expect(map.has('498,6')).toBeTruthy()

  })

  it('pointsVert', () => {

    const map = new Map()
    pointsVert(map, [498, 4], [498, 6])

    expect(map.has('498,4')).toBeTruthy()
    expect(map.has('498,5')).toBeTruthy()
    expect(map.has('498,6')).toBeTruthy()

  })

  it('pointsInLine', () => {
    const map1 = new Map()
    pointsInLine(map1, [498, 6], [496, 6])
    expect(map1.has('496,6')).toBeTruthy()
    expect(map1.has('497,6')).toBeTruthy()
    expect(map1.has('498,6')).toBeTruthy()


    const map2 = new Map()
    pointsInLine(map2, [498, 4], [498, 6])


    expect(map2.has('498,4')).toBeTruthy()
    expect(map2.has('498,5')).toBeTruthy()
    expect(map2.has('498,6')).toBeTruthy()

  })



  it('buildMap', () => {
    expect(buildMap(testInput)).toStrictEqual(testMap)
  })

  it('findBottom', () => {
    expect(findBottom(testMap)).toBe(9)
  })

  it('part1', () => {
    expect(part1(testInput, [500, 0])).toBe(24)
  })


  it('part2', () => {
    expect(part2(testInput, [500, 0])).toBe(93)
  })

})