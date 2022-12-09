import { findMarker, part1, part2 } from './day06'

describe('day06', () => {

  it('findMarker should return expected results', () => {
    expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5)
    expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6)
    expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(10)
    expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(11)

    expect(findMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19)
    expect(findMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23)
    expect(findMarker('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23)
    expect(findMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29)
    expect(findMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26)

  })


  it('part1 should return expected results', () => {
    expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
  })

  it('part2 should return expected results', () => {
    expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19)
  })
})