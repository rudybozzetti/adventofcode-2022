
import { fromSNAFU, toSNAFU, parseInput, part1, part2 } from './day25'

const testInput = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`

const testModel = [

  1747,
  906,
  198,
  11,
  201,
  31,
  1257,
  32,
  353,
  107,
  7,
  3,
  37
]




describe('day25', () => {

  it('fromSNAFU', () => {
    expect(fromSNAFU('1')).toBe(1)
    expect(fromSNAFU('2')).toBe(2)
    expect(fromSNAFU('1-')).toBe(4)
    expect(fromSNAFU('10')).toBe(5)
    expect(fromSNAFU('11')).toBe(6)
    expect(fromSNAFU('12')).toBe(7)
    expect(fromSNAFU('2=')).toBe(8)
    expect(fromSNAFU('2-')).toBe(9)
    expect(fromSNAFU('20')).toBe(10)
    expect(fromSNAFU('1=0')).toBe(15)
    expect(fromSNAFU('1-0')).toBe(20)
    expect(fromSNAFU('1=11-2')).toBe(2022)
    expect(fromSNAFU('1-0---0')).toBe(12345)
    expect(fromSNAFU('1121-1110-1=0')).toBe(314159265)
  })


  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testModel)
  })

  it('toSNAFU', () => {
    expect(toSNAFU(353)).toBe('1=-1=')
  })

  it('part1', ()=> {
    expect(part1(testInput)).toBe('2=-1=0')
  })
})