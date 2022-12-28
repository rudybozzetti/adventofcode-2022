const fs = require('fs');
const path = require('path')

export const buildModel = input => {
  return input.split(/\n/).reduce((acc, line) => {
    const [
      [id],
      [oreRobotOreCost],
      [clayRobotOreCost],
      [obsidianRobotOreCost],
      [obsidianRobotClayCost],
      [geodeRobotOreCost],
      [geodeRobotObsidianCost]
    ] = [...line.matchAll(/\d+/g)]

    return [
      ...acc,
      {
        id: parseInt(id),
        oreRobotOreCost: parseInt(oreRobotOreCost),
        clayRobotOreCost: parseInt(clayRobotOreCost),
        obsidianRobotOreCost: parseInt(obsidianRobotOreCost),
        obsidianRobotClayCost: parseInt(obsidianRobotClayCost),
        geodeRobotOreCost: parseInt(geodeRobotOreCost),
        geodeRobotObsidianCost: parseInt(geodeRobotObsidianCost),
      }
    ]

  }, [])
}

const ops = ['nop', 'oreBot', 'clayBot', 'obsidianBot', 'geodeBot']

export const initialState = {
  ore: 0,
  clay: 0,
  obsidian: 0,
  geode: 0,
  time: 24,
  bots: {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
  },
  choices: []
}

export const getSolutionVote = (blueprint, solution) => {
  const oreBotFactor = blueprint.oreRobotOreCost
  const clayBotFactor = blueprint.clayRobotOreCost
  const obsidianBotFactor = blueprint.obsidianRobotOreCost + blueprint.obsidianRobotClayCost * blueprint.clayRobotOreCost
  const geodeBotFactor = blueprint.geodeRobotOreCost + blueprint.geodeRobotObsidianCost * (blueprint.obsidianRobotOreCost + blueprint.obsidianRobotClayCost * blueprint.clayRobotOreCost)
  //
  return solution.bots.ore * oreBotFactor +
    solution.bots.clay * clayBotFactor +
    solution.bots.obsidian * obsidianBotFactor +
    solution.bots.geode * geodeBotFactor

}

export const _getBlueprintSolutions = (blueprint, state, op) => {

  const lastOp = state.choices[state.choices.length - 1]

  const tmpState = {
    ...state,
    choices: [...state.choices, op],
    //  update mats
    ore: state.ore + state.bots.ore - (
      op === 'oreBot' ? blueprint.oreRobotOreCost :
        op === 'clayBot' ? blueprint.clayRobotOreCost :
          op === 'obsidianBot' ? blueprint.obsidianRobotOreCost :
            op === 'geodeBot' ? blueprint.geodeRobotOreCost :
              0),
    clay: state.clay + state.bots.clay - (
      op === 'obsidianBot' ? blueprint.obsidianRobotClayCost : 0),
    obsidian: state.obsidian + state.bots.obsidian - (
      op === 'geodeBot' ? blueprint.geodeRobotObsidianCost : 0),
    geode: state.geode + state.bots.geode,
    //  update time
    time: state.time - 1,
    //  update bots
    bots: {
      ore: state.bots.ore + (lastOp === 'oreBot' ? 1 : 0),
      clay: state.bots.clay + (lastOp === 'clayBot' ? 1 : 0),
      obsidian: state.bots.obsidian + (lastOp === 'obsidianBot' ? 1 : 0),
      geode: state.bots.geode + (lastOp === 'geodeBot' ? 1 : 0),
    }
  }

  const solutions = [{ ...tmpState, vote: getSolutionVote(blueprint, tmpState) }]

  if (tmpState.time <= 4) {
    return solutions
  }

  const nextAvailOps = [
    'nop',
    tmpState.ore >= blueprint.oreRobotOreCost ? 'oreBot' : undefined,
    tmpState.ore >= blueprint.clayRobotOreCost ? 'clayBot' : undefined,
    tmpState.ore >= blueprint.obsidianRobotOreCost && tmpState.clay >= blueprint.obsidianRobotClayCost ? 'obsidianBot' : undefined,
    tmpState.ore >= blueprint.geodeRobotOreCost && tmpState.obsidian >= blueprint.geodeRobotObsidianCost ? 'geodeBot' : undefined
  ].filter(o => !!o)

  //  console.log('### time', tmpState.time, 'state', tmpState, 'next avail ops', nextAvailOps)

  let solutionVove = 0
  for (const nextOp of nextAvailOps) {
    const nextSolutions = getBlueprintSolutions(blueprint, tmpState, nextOp).map(s => ({
      ...s,
      vote: getSolutionVote(blueprint, s)
    })).sort((a, b) => b.vote - a.vote)

    for (const s of nextSolutions) {

      //  if (nextSolutions.find((o) => o !== s && o.vote > s.vote)) {
      //  se trovo una soluzione migliore, evito di accodare
      //  continue
      //  }

      solutions.push(s)
    }

  }

  return solutions

}


export const getBlueprintSolutions = (blueprint) => {
  const acc = [initialState]
  const stack = [{ state: initialState, op: 'nop' }]

  while (stack.length > 0) {
    const { state, op } = stack.pop()
    //

    const lastOp = state.choices[state.choices.length - 1]

    const tmpState = {
      ...state,
      choices: [...state.choices, op],
      //  update mats
      ore: state.ore + state.bots.ore - (
        op === 'oreBot' ? blueprint.oreRobotOreCost :
          op === 'clayBot' ? blueprint.clayRobotOreCost :
            op === 'obsidianBot' ? blueprint.obsidianRobotOreCost :
              op === 'geodeBot' ? blueprint.geodeRobotOreCost :
                0),
      clay: state.clay + state.bots.clay - (
        op === 'obsidianBot' ? blueprint.obsidianRobotClayCost : 0),
      obsidian: state.obsidian + state.bots.obsidian - (
        op === 'geodeBot' ? blueprint.geodeRobotObsidianCost : 0),
      geode: state.geode + state.bots.geode,
      //  update time
      time: state.time - 1,
      //  update bots
      bots: {
        ore: state.bots.ore + (lastOp === 'oreBot' ? 1 : 0),
        clay: state.bots.clay + (lastOp === 'clayBot' ? 1 : 0),
        obsidian: state.bots.obsidian + (lastOp === 'obsidianBot' ? 1 : 0),
        geode: state.bots.geode + (lastOp === 'geodeBot' ? 1 : 0),
      }
    }

    const nopChoices = tmpState.choices.slice(0, Math.max(blueprint.oreRobotOreCost,blueprint. clayRobotOreCost)).every(o => o === 'nop')
    if(initialState.time - tmpState.time === Math.max(blueprint.oreRobotOreCost,blueprint. clayRobotOreCost) && nopChoices) {
      //
      console.log('### continue tmpState.time',tmpState.time,'choices',tmpState.choices )
      continue
    }

    if (tmpState.time <= 13) {
      acc.push(tmpState)
      continue
    }

    
    //
    const canCreateOreRobot = tmpState.ore >= blueprint.oreRobotOreCost
    const canCreateClayRobot = tmpState.ore >= blueprint.clayRobotOreCost
    const canCreateObsidianRobot = tmpState.ore >= blueprint.obsidianRobotOreCost && tmpState.clay >= blueprint.obsidianRobotClayCost
    const canCreateGeodeRobot = tmpState.ore >= blueprint.geodeRobotOreCost && tmpState.obsidian >= blueprint.geodeRobotObsidianCost

    //  console.log('### canCreateClayRobot at', tmpState.time, ':',canCreateClayRobot, '### tmpState.ore',tmpState.ore,'### blueprint.clayRobotOreCost',blueprint.clayRobotOreCost)

    //

    const nextAvailOps = canCreateGeodeRobot ? ['geodeBot']
        : [
          'nop',
          canCreateOreRobot ? 'oreBot' : undefined,
          canCreateClayRobot ? 'clayBot' : undefined,
          canCreateObsidianRobot ? 'obsidianBot' : undefined,
          canCreateGeodeRobot ? 'geodeBot' : undefined
        ].filter(o => !!o).filter(o => {
          //  produzione di ore 
          if (o === 'oreBot' && tmpState.bots.ore >= Math.max(
            blueprint.oreRobotOreCost,
            blueprint.clayRobotOreCost,
            blueprint.obsidianRobotOreCost,
            blueprint.geodeRobotOreCost
          )) {
            return false
          }

          if (o === 'clayBot' && tmpState.bots.clay >= blueprint.obsidianRobotClayCost) {
            return false
          }

          if (o === 'obsidianBot' && tmpState.bots.obsidian >= blueprint.geodeRobotObsidianCost) {
            return false
          }

          return true
        })

    //  console.log('### nextAvailOps at ', tmpState.time, ':', nextAvailOps)

    for (const nextOp of nextAvailOps) {
      stack.push({ state: tmpState, op: nextOp })
    }
  }

  return acc
}

export const dumpSolutions = solutions => {
  const stream = solutions.reduce((acc, s) => acc + "\n" + JSON.stringify(s) + "\n\n", "")
  fs.writeFile(path.resolve(__dirname, 'debug.txt'), "\n===\n\n" + stream, { flag: 'w' }, (err) => {
    if (err) {
      console.error('### error', err)
    }

  })
}

export const part1 = inputData => {
  const blueprints = buildModel(inputData)

  const solutions = getBlueprintSolutions(blueprints[0])
  const sorted = solutions
    .sort((a, b) => a.time === b.time ? b.geode - a.geode : a.time - b.time)
  //  .filter(o => o.time === solutions[0].time)

  //  console.log("\n\n### solutions", sorted.slice(0, 10))
  //  console.log("\n\n### solutions", sorted)
  dumpSolutions(sorted)

}

export const part2 = inputData => {

}