import { getArrangementAndMoves, getArrangement, getMoves, applyMoves, getTopStock, part1 } from './day05'

describe('day05', () => {

  const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
  
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

  it('getArrangementAndMoves returns expected result', () => {
    expect(getArrangementAndMoves(testInput)).toStrictEqual([
      ['    [D]', '[N] [C]', '[Z] [M] [P]'],
      ['move 1 from 2 to 1', 'move 3 from 1 to 3', 'move 2 from 2 to 1', 'move 1 from 1 to 2']
    ])
  })

  it('getArrangement returns expected result', () => {
    expect(getArrangement(['    [D]', '[N] [C]', '[Z] [M] [P]'])).toStrictEqual({
      1: ['Z', 'N'],
      2: ['M', 'C', 'D'],
      3: ['P']
    })
  })

  it('getMoves returns expected result', () => {
    expect(getMoves([
      'move 1 from 2 to 1',
      'move 3 from 1 to 3',
      'move 2 from 2 to 1',
      'move 1 from 1 to 2'

    ])).toStrictEqual([
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2]

    ])
  })

  it('applyMoves returns expected result', () => {
    const testArrangement = {
      1: ['Z', 'N'],
      2: ['M', 'C', 'D'],
      3: ['P']
    }
    const testMoves = [
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2]

    ]
    expect(applyMoves(testArrangement, testMoves)).toStrictEqual({
      1: ['C'],
      2: ['M'],
      3: ['P', 'D', 'N', 'Z']
    })

    expect(applyMoves(testArrangement, testMoves, true)).toStrictEqual({
      1: ['M'],
      2: ['C'],
      3: ['P', 'Z', 'N', 'D']
    })
  })



  it('getTopStock returns expected result', () => {
    const testArrangement = ({
      1: ['C'],
      2: ['M'],
      3: ['P', 'D', 'N', 'Z']
    })

    expect(getTopStock(testArrangement)).toBe('CMZ')
  })

  it('part1 returns expected result', () => {

    expect(part1(testInput)).toBe('CMZ')
  })


})