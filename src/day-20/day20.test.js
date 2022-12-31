
import { parseInput, decrypt, part1 } from './day20'

const testInput = `1
2
-3
3
-2
0
4`

const testData = [1, 2, -3, 3, -2, 0, 4]
const testDecrypted = [1, 2, -3, 4, 0, 3, -2]

describe('day20', () => {

  it('parseInput', () => {
    expect(parseInput(testInput)).toStrictEqual(testData)
  })

  it('decrypt', () => {
    expect(decrypt(testData)).toStrictEqual(testDecrypted)
  })

  it('part1', () => {
    expect(part1(testInput)).toStrictEqual(3)
  })
})