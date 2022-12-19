
import floydWarshall, {weight} from './floyd-warshall'


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

const testWeightedGraph = {
  AA: {BB: 2, DD: 3},
  BB: {AA: 2},
  CC: {DD: 1},
  DD: {AA:3, C:1}
}

describe('floydWarshall', () => {

  it('weight', () => {
    expect(weight(testGraph, 'AA', 'AA')).toBe(0)
    expect(weight(testGraph, 'AA', 'BB')).toBe(1)
    expect(weight(testGraph, 'AA', 'CC')).toBe(Number.POSITIVE_INFINITY)
    //
    expect(weight(testWeightedGraph, 'AA', 'AA')).toBe(0)
    expect(weight(testWeightedGraph, 'AA', 'BB')).toBe(2)
    expect(weight(testWeightedGraph, 'AA', 'CC')).toBe(Number.POSITIVE_INFINITY)

  })

  it('floydWarshall', () => {
    const result =     floydWarshall(testGraph)
    expect(result['AA']).toStrictEqual({AA:0, BB:1,CC:2,DD:1,EE:2, FF:3,GG:4,HH:5,II:1,JJ:2})
    expect(result['JJ']).toStrictEqual({AA:2, BB:3,CC:4,DD:3,EE:4, FF:5,GG:6,HH:7,II:1,JJ:0})

  })
})

