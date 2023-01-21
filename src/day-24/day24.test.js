
import { parseInput, updateBlizzards, solve, part1, part2 } from './day24'
import {
  testBlizzardsModelMinute1,
  testBlizzardsModelMinute2,
  testBlizzardsModelMinute3,
  testBlizzardsModelMinute4,
  testBlizzardsModelMinute5,
  testBlizzardsModelMinute6,
  testBlizzardsModelMinute7,
  testBlizzardsModelMinute8,
  testBlizzardsModelMinute9,
  testBlizzardsModelMinute10,
  testBlizzardsModelMinute11,

} from './day24.testdata'

const testInput = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`


const testValleyModel = {
  minx: 0,
  miny: 0,
  maxx: 7,
  maxy: 5,
  start: { x: 1, y: 0 },
  end: { x: 6, y: 5 }
}

const testBlizzardsModel = [
  { dir: '>', x: 1, y: 1 },
  { dir: '>', x: 2, y: 1 },
  { dir: '<', x: 4, y: 1 },
  { dir: '^', x: 5, y: 1 },
  { dir: '<', x: 6, y: 1 },
  //
  { dir: '<', x: 2, y: 2 },
  { dir: '<', x: 5, y: 2 },
  { dir: '<', x: 6, y: 2 },
  //
  { dir: '>', x: 1, y: 3 },
  { dir: 'v', x: 2, y: 3 },
  { dir: '>', x: 4, y: 3 },
  { dir: '<', x: 5, y: 3 },
  { dir: '>', x: 6, y: 3 },
  //
  { dir: '<', x: 1, y: 4 },
  { dir: '^', x: 2, y: 4 },
  { dir: 'v', x: 3, y: 4 },
  { dir: '^', x: 4, y: 4 },
  { dir: '^', x: 5, y: 4 },
  { dir: '>', x: 6, y: 4 },

]


describe('day24', () => {
  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual({
      valley: testValleyModel,
      blizzards: testBlizzardsModel
    })
  })

  it('updateBlizzards', () => {
    const bounds = {
      minx: 0, miny: 0, maxx: 7, maxy: 5
    }
    expect(updateBlizzards(bounds, testBlizzardsModel)).toStrictEqual(testBlizzardsModelMinute1)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute1)).toStrictEqual(testBlizzardsModelMinute2)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute2)).toStrictEqual(testBlizzardsModelMinute3)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute3)).toStrictEqual(testBlizzardsModelMinute4)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute4)).toStrictEqual(testBlizzardsModelMinute5)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute5)).toStrictEqual(testBlizzardsModelMinute6)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute6)).toStrictEqual(testBlizzardsModelMinute7)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute7)).toStrictEqual(testBlizzardsModelMinute8)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute8)).toStrictEqual(testBlizzardsModelMinute9)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute9)).toStrictEqual(testBlizzardsModelMinute10)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute10)).toStrictEqual(testBlizzardsModelMinute11)
    expect(updateBlizzards(bounds, testBlizzardsModelMinute11)).toStrictEqual(testBlizzardsModel)
  })

  it.only('solve', () => {
    expect(solve(testValleyModel, testBlizzardsModel)).toBe(18)

    /*
    expect(solve({
      ...testValleyModel,
      start: { x: 6, y: 5 },
      end: { x: 1, y: 0 }
    }, testBlizzardsModel, 18, true)).toBe(23)
    */

  })

  it('part1', () => {
    expect(part1(testInput)).toBe(18)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(54)
  })
})