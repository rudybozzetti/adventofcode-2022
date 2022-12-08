
import {
  intersect,
  stringIntersection,
  getTypePriority,
  splitLine,
  getPrioritySum,
  variadicIntersect,
  variadicStringIntersection,
  getCommonBadgesSum
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

  it('variadicIntersect should return expected result', () => {
    const a1 = ['foo', 'bar', 'baz']
    const a2 = ['fooa', 'bar', 'baza']
    const a3 = ['foob', 'bar', 'bazz']
    expect(variadicIntersect(a1, a2, a3)).toStrictEqual(['bar'])

  })

  it('variadicStringIntersection should return expected result', () => {
    const s1L1 = 'vJrwpWtwJgWrhcsFMMfFFhFp'
    const s1L2 = 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'
    const s1L3 = 'PmmdzqPrVvPwwTWBwg'

    expect(variadicStringIntersection(s1L1, s1L2, s1L3)).toBe('r')

    const s2L1 = 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'
    const s2L2 = 'ttgJtRGJQctTZtZT'
    const s2L3 = 'CrZsJsPPZsGzwwsLwLmpwMDw'

    expect(variadicStringIntersection(s2L1, s2L2, s2L3)).toBe('Z')

  })

  it('getCommonBadgesSum should return expected result', () => {
    const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

    expect(getCommonBadgesSum(testData)).toBe(70)
  })


})