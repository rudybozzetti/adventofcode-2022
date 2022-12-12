import { testMonkeys } from './monkeys'

import { execRound, execRounds, part1, part2 } from './day11'

describe('day11', () => {

  it('execRound', () => {
    const res1 = execRound(testMonkeys)
    expect(res1[0].items).toStrictEqual([20, 23, 27, 26])
    expect(res1[1].items).toStrictEqual([2080, 25, 167, 207, 401, 1046])
    expect(res1[2].items).toStrictEqual([])
    expect(res1[3].items).toStrictEqual([])
    //

  })

  it('execRounds', () => {

    const res1 = execRounds(testMonkeys, 1)
    expect(res1[0].items).toStrictEqual([20, 23, 27, 26])
    expect(res1[1].items).toStrictEqual([2080, 25, 167, 207, 401, 1046])
    expect(res1[2].items).toStrictEqual([])
    expect(res1[3].items).toStrictEqual([])
    //
    const res2 = execRounds(testMonkeys, 20)
    expect(res2[0].items).toStrictEqual([10, 12, 14, 26, 34])
    expect(res2[1].items).toStrictEqual([245, 93, 53, 199, 115])
    expect(res2[2].items).toStrictEqual([])
    expect(res2[3].items).toStrictEqual([])

    ///

    const test20NoRelief = execRounds(testMonkeys, 20, 1)
    expect(test20NoRelief[0].inspected).toBe(99)
    expect(test20NoRelief[1].inspected).toBe(97)
    expect(test20NoRelief[2].inspected).toBe(8)
    expect(test20NoRelief[3].inspected).toBe(103)
    //
    const test1000NoRelief = execRounds(testMonkeys, 1000, 1)
    expect(test1000NoRelief[0].inspected).toBe(5204)
    expect(test1000NoRelief[1].inspected).toBe(4792)
    expect(test1000NoRelief[2].inspected).toBe(199)
    expect(test1000NoRelief[3].inspected).toBe(5192)
    //
    const test2000NoRelief = execRounds(testMonkeys, 2000, 1)
    expect(test2000NoRelief[0].inspected).toBe(10419)
    expect(test2000NoRelief[1].inspected).toBe(9577)
    expect(test2000NoRelief[2].inspected).toBe(392)
    expect(test2000NoRelief[3].inspected).toBe(10391)
    //
    const test9000NoRelief = execRounds(testMonkeys, 9000, 1)
    expect(test9000NoRelief[0].inspected).toBe(46945)
    expect(test9000NoRelief[1].inspected).toBe(43051)
    expect(test9000NoRelief[2].inspected).toBe(1746)
    expect(test9000NoRelief[3].inspected).toBe(46807)

  })

  it('part1', () => {
    expect(part1(testMonkeys, 20)).toBe(10605)

  })

  it('part2', () => {
    expect(part2(testMonkeys, 10000)).toBe(2713310158)

  })


})