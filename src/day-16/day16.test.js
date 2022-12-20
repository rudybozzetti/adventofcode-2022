
import { buildGraph, getSolutionScore, getOptimizedValves, getSolutions, part1, part2, arrayIntersect } from './day16'

const testInput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`


const testGraph = {
  AA: ['DD', 'II', 'BB'],
  BB: ['CC', 'AA'],
  CC: ['DD', 'BB'],
  DD: ['CC', 'AA', 'EE'],
  EE: ['FF', 'DD'],
  FF: ['EE', 'GG'],
  GG: ['FF', 'HH'],
  HH: ['GG'],
  II: ['AA', 'JJ'],
  JJ: ['II']
}

const testRates = {
  AA: 0,
  BB: 13,
  CC: 2,
  DD: 20,
  EE: 3,
  FF: 0,
  GG: 0,
  HH: 22,
  II: 0,
  JJ: 21
}

const testDistances = {
  AA: { AA: 0, BB: 1, CC: 2, DD: 1, EE: 2, FF: 3, GG: 4, HH: 5, II: 1, JJ: 2 },
  BB: { AA: 1, BB: 0, CC: 1, DD: 2, EE: 3, FF: 4, GG: 5, HH: 6, II: 2, JJ: 3 },
  CC: { AA: 2, BB: 1, CC: 0, DD: 1, EE: 2, FF: 3, GG: 4, HH: 5, II: 3, JJ: 4 },
  DD: { AA: 1, BB: 2, CC: 1, DD: 0, EE: 1, FF: 2, GG: 3, HH: 4, II: 2, JJ: 3 },
  EE: { AA: 2, BB: 3, CC: 2, DD: 1, EE: 0, FF: 1, GG: 2, HH: 3, II: 3, JJ: 4 },
  FF: { AA: 3, BB: 4, CC: 3, DD: 2, EE: 1, FF: 0, GG: 1, HH: 2, II: 4, JJ: 5 },
  GG: { AA: 4, BB: 5, CC: 4, DD: 3, EE: 2, FF: 1, GG: 0, HH: 1, II: 5, JJ: 6 },
  HH: { AA: 5, BB: 6, CC: 5, DD: 4, EE: 3, FF: 2, GG: 1, HH: 0, II: 6, JJ: 7 },
  II: { AA: 1, BB: 2, CC: 3, DD: 2, EE: 3, FF: 4, GG: 5, HH: 6, II: 0, JJ: 1 },
  JJ: { AA: 2, BB: 3, CC: 4, DD: 3, EE: 4, FF: 5, GG: 6, HH: 7, II: 1, JJ: 0 }

}

const testValves = [
  'BB',
  'CC',
  'DD',
  'EE',
  'HH',
  'JJ',
]

describe('buildGraph', () => {

  it('buildGraph', () => {
    const [graph, rates] = buildGraph(testInput)
    expect(graph).toStrictEqual(testGraph)
    expect(rates).toStrictEqual(testRates)

  })

  it('getSolutionScore', () => {
    const solution = {
      DD: 28,
      BB: 25,
      JJ: 21,
      HH: 13,
      EE: 9,
      CC: 6
    }
    expect(getSolutionScore(solution, testRates)).toBe(1651)
  })

  it('getOptimizedValves', () => {
    expect(getOptimizedValves(testRates)).toStrictEqual([
      'BB',
      'CC',
      'DD',
      'EE',
      'HH',
      'JJ'
    ])
  })

  it('getSolutions', () => {
    const d = { AA: { AA: 0, BB: 1, CC: 2, DD: 1 }, BB: { AA: 1, BB: 0, CC: 1, DD: 2 }, CC: { AA: 2, BB: 1, CC: 0, DD: 1 }, DD: { AA: 1, BB: 2, CC: 1, DD: 0 } }

    const rates = { AA: 0, BB: 13, CC: 2, DD: 20 }
    const valves = ['BB', 'CC', 'DD']

    const s = getSolutions(d, rates, valves, 30, 'AA', [])

  })

  it('part1', () => {
    expect(part1(testInput)).toBe(1651)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(1707)
  })

  it('arrayIntersect', () => {
    expect(arrayIntersect([], [])).toStrictEqual([])
    expect(arrayIntersect(['a'], ['b'])).toStrictEqual([])
    expect(arrayIntersect(['a', 'b', 'c'], ['z', 'b', 'z'])).toStrictEqual(['b'])


  })
})