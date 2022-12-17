
import { buildGraph, getSolutionScore } from './day16'

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
})