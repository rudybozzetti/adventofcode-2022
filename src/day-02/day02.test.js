
import { getScore, getStratScore } from './day02'

describe('day02', () => {

  it('getScore should return expected result', () => {
    const testData = `A Y\nB X\nC Z`
    const result = getScore(testData)

    expect(result).toBe(15)


  })

  it('getStratScore should return expected result', () => {
    const testData = `A Y\nB X\nC Z`
    const result = getStratScore(testData)

    expect(result).toBe(12)


  })


})