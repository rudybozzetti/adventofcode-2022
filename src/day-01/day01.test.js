
import {prepareData, sumTop} from './day01'

describe('day01', () => {

  

    it('prepareData should return expected data', () => {
      const testData = `1000
      2000
      3000
      
      4000
      
      5000
      6000
      
      7000
      8000
      9000
      
      10000`
       

      const result = prepareData(testData)

      expect(result).toStrictEqual([6000,4000,11000,24000,10000])

      console.log('### result', result)

    })
  

  it('sumTop should return expected data', () => {
    const testData = [6000,4000,11000,24000,10000]

    const result = sumTop(testData,3)

    expect(result).toBe(45000)
  })
})