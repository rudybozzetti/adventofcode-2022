
import {
  intersect,
  stringIntersection,
  getTypePriority,
  splitLine,
  getPrioritySum
} from './day03'

describe('day03', () => {

  it('intersect should return expected result', () => {
    expect(intersect(['a', 'b', 'a'], ['c', 'b', 'c', 'c'])).toStrictEqual(['b'])
  })

  it('stringIntersection should return expected result', () => {
    expect(stringIntersection('vJrwpWtwJgWr', 'hcsFMMfFFhFp')).toBe('p')
  })

  it('getTypePriority should return expected results', () => {

    expect(getTypePriority('a')).toBe(1)
    expect(getTypePriority('z')).toBe(26)
    expect(getTypePriority('A')).toBe(27)
    expect(getTypePriority('Z')).toBe(52)
    expect(getTypePriority('#')).toBe(undefined)
  })

  it('splitLine should return expected result', () => {

    expect(splitLine('vJrwpWtwJgWrhcsFMMfFFhFp')).toStrictEqual(['vJrwpWtwJgWr', 'hcsFMMfFFhFp'])

  })


  it('getPrioritySum should return expected result', () => {
    const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(getPrioritySum(testData)).toBe(157)

  })


})