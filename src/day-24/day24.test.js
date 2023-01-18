
import { parseInput, updateBlizzards, solve } from './day24'

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

const testBlizzardsModelMinute1 = [
  { dir: '>', x: 2, y: 1 },
  { dir: '>', x: 3, y: 1 },
  { dir: '<', x: 3, y: 1 },
  { dir: '^', x: 5, y: 4 },
  { dir: '<', x: 5, y: 1 },
  //
  { dir: '<', x: 1, y: 2 },
  { dir: '<', x: 4, y: 2 },
  { dir: '<', x: 5, y: 2 },
  //
  { dir: '>', x: 2, y: 3 },
  { dir: 'v', x: 2, y: 4 },
  { dir: '>', x: 5, y: 3 },
  { dir: '<', x: 4, y: 3 },
  { dir: '>', x: 1, y: 3 },
  //
  { dir: '<', x: 6, y: 4 },
  { dir: '^', x: 2, y: 3 },
  { dir: 'v', x: 3, y: 1 },
  { dir: '^', x: 4, y: 3 },
  { dir: '^', x: 5, y: 3 },
  { dir: '>', x: 1, y: 4 },

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
  })

  it('solve', () => {
    expect(solve(testValleyModel, testBlizzardsModel)).toBe(18)
  })
})