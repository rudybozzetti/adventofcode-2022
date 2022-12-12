
import { buildMap, buildGraph, getTopCell, getRightCell, getBottomCell, getLeftCell, findStartEnd, part1, findAllStarts, part2 } from './day12'

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`


describe('day12', () => {

  it('buildMap', () => {
    console.log('### map', buildMap(`Sa\nbE`))
    expect(buildMap(`Sa\nbE`)).toStrictEqual([

      [{ id: '0,0', h: 'a', isStart: true, isEnd: false },
      { id: '0,1', h: 'a', isStart: false, isEnd: false }],
      [{ id: '1,0', h: 'b', isStart: false, isEnd: false },
      { id: '1,1', h: 'z', isStart: false, isEnd: true }],

    ])


  })

  it('getTopCell', () => {
    const map = buildMap(`Sa\nbE`)
    expect(getTopCell(map, 0, 0)).toStrictEqual({ "h": "b", "id": "1,0", "isEnd": false, "isStart": false })
    expect(getTopCell(map, 1, 0)).toBe(undefined)

  })

  it('getRightCell', () => {
    const map = buildMap(`Sa\nbE`)
    expect(getRightCell(map, 0, 0)).toStrictEqual({ "h": "a", "id": "0,1", "isEnd": false, "isStart": false })
    expect(getRightCell(map, 0, 1)).toBe(undefined)
  })

  it('getBottomCell', () => {
    const map = buildMap(`Sa\nbE`)
    expect(getBottomCell(map, 1, 0)).toStrictEqual({ "h": "a", "id": "0,0", "isEnd": false, "isStart": true })
    expect(getBottomCell(map, 0, 0)).toBe(undefined)
  })

  it('getLeftCell', () => {
    const map = buildMap(`Sa\nbE`)
    expect(getLeftCell(map, 0, 1)).toStrictEqual({ "h": "a", "id": "0,0", "isEnd": false, "isStart": true })
    expect(getLeftCell(map, 0, 0)).toBe(undefined)
  })

  it('buildGraph', () => {
    const g = buildGraph(buildMap(`Sa\nbE`))
    console.log('### g', g)
  })

  it('findStartEnd', () => {
    const se = expect(findStartEnd(buildMap(`Sa\nbE`))).toStrictEqual({
      start: '0,0',
      end: '1,1'
    })

  })


  it('part1', () => {
    expect(part1(testInput)).toBe(31)
  })

  it('findAllStarts', () => {
    expect(findAllStarts(buildMap(`Sa\nbE`))).toStrictEqual([
      '0,0', '0,1'
    ])
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(29)
  })



})