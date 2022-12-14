import { buildModel, getBlueprintSolutions, initialState, part2InitialState, part1, part2 } from './day19'

const testInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`


const testBuileprint1 = {
  id: 1,
  oreRobotOreCost: 4,
  clayRobotOreCost: 2,
  obsidianRobotOreCost: 3,
  obsidianRobotClayCost: 14,
  geodeRobotOreCost: 2,
  geodeRobotObsidianCost: 7
}

const testBuileprint2 = {
  id: 2,
  oreRobotOreCost: 2,
  clayRobotOreCost: 3,
  obsidianRobotOreCost: 3,
  obsidianRobotClayCost: 8,
  geodeRobotOreCost: 3,
  geodeRobotObsidianCost: 12
}


describe('day19', () => {
  it('buildModel', () => {
    expect(buildModel(testInput)).toStrictEqual([testBuileprint1, testBuileprint2])
  })

  it('getBlueprintSolutions', () => {
    expect(getBlueprintSolutions(testBuileprint1, initialState)).toBe(9)
    expect(getBlueprintSolutions(testBuileprint1, part2InitialState)).toBe(56)

  })

  it('part1', () => {
    expect(part1(testInput)).toBe(33)
  })

  it('part2', () => {
    expect(part2(testInput)).toBe(56 * 62)
  })


})