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
  counter: 0,
  bots: {
    ore: 1,
    clay: 0,
    obsidian: 0,
    geode: 0
  },
  choices: []
}

export const part2InitialState = {
  ...initialState,
  time: 32
}



export const getVisitedKey = ({ ore, clay, obsidian, geode, time, bots }) => {

  return `${ore}|${clay}|${obsidian}|${geode}#${time}#${bots.ore}|${bots.clay}|${bots.obsidian}|${bots.geode}`

}

/**
 * es: time left: 5
 * // if can build a new bot every remaining minute
 *    #####
 *     ####
 *      ###
 *       ##
 *        #
 * 
 * es: having 3 bots
 * // current bots
 *    #####
 *    #####
 *    #####     
 *  
 * 
 */
export const esitmateMax = (initial, bots, timeLeft) => {
  return initial + bots * timeLeft + (timeLeft * (timeLeft + 1)) / 2
}


export const getBlueprintSolutions = (blueprint, initState) => {

  const maxOreNeeded = Math.max(blueprint.oreRobotOreCost, blueprint.clayRobotOreCost, blueprint.obsidianRobotOreCost, blueprint.geodeRobotOreCost)
  const maxClayNeeded = blueprint.obsidianRobotClayCost
  const maxObsidianNeeded = blueprint.geodeRobotObsidianCost

  //  "nop","nop","clayBot","nop","clayBot",
  //  "nop","clayBot","nop","nop","nop",
  //  "obsidianBot","clayBot","nop","nop","obsidianBot",
  //  "nop","nop","geodeBot","nop","nop",
  //  "geodeBot","nop","nop","nop"

  const testChoices = [
    'nop',
    'nop',
    'clayBot',
    'nop',
    'clayBot',
    //  5
    'nop',
    'clayBot',
    'nop',
    'nop',
    'nop',
    //  10
    'obsidianBot',
    'clayBot',
    'nop',
    'nop',
    'obsidianBot',
    //  15
    'nop',
    'nop',
    'geodeBot',
    'nop',
    'nop',
    //  20
    'geodeBot',
    'nop',
    'nop',
    'nop',

  ]
  //
  const acc = []
  const stack = [{ state: initState, op: 'nop' }]

  const visited = new Map()


  let i = 1;
  let bestGeode = 0
  while (stack.length > 0) {
    const { state, op } = stack.pop()
    //

    //


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
      counter: state.counter + 1,
      //  update bots
      bots: {
        ore: state.bots.ore + (op === 'oreBot' ? 1 : 0),
        clay: state.bots.clay + (op === 'clayBot' ? 1 : 0),
        obsidian: state.bots.obsidian + (op === 'obsidianBot' ? 1 : 0),
        geode: state.bots.geode + (op === 'geodeBot' ? 1 : 0),
      }
    }

    /*
    const nopChoices = tmpState.choices.slice(-1 * Math.max(blueprint.oreRobotOreCost, blueprint.clayRobotOreCost)).every(o => o === 'nop')
    if (initialState.time - tmpState.time === Math.max(blueprint.oreRobotOreCost, blueprint.clayRobotOreCost) && nopChoices) {
      //
      console.log('### continue tmpState.time', tmpState.time, 'choices', tmpState.choices)
      continue
    }
    */

    //  console.log('### tmpState', tmpState)

    const visitedKey = getVisitedKey(tmpState)
    if (visited.has(visitedKey)) {
      //  console.log('### already visited', visitedKey)
      continue
    }
    visited.set(visitedKey)

    if (tmpState.time <= 0) {
      if (tmpState.geode > bestGeode) {
        bestGeode = tmpState.geode
        acc.push(tmpState)
      }
      continue
    }

    if (esitmateMax(tmpState.geode, tmpState.bots.geode, tmpState.time) < bestGeode) {
      continue
    }

    //  no more geode bots because not enough obsidian
    if (esitmateMax(tmpState.obsidian, tmpState.bots.obsidian, tmpState.time) < blueprint.geodeRobotObsidianCost) {
      //  update best estimate
      bestGeode = Math.max(bestGeode, tmpState.geode + tmpState.bots.geode * tmpState.time)
      continue
    }

    //  no more geode bots because not enough ore
    if (esitmateMax(tmpState.ore, tmpState.bots.ore, tmpState.time) < blueprint.geodeRobotOreCost) {
      //  update best estimate
      bestGeode = Math.max(bestGeode, tmpState.geode + tmpState.bots.geode * tmpState.time)
      continue
    }



    //  eval no operation
    if ((tmpState.bots.obsidian && tmpState.obsidian < maxObsidianNeeded) ||
      (tmpState.bots.clay && tmpState.clay < maxClayNeeded) ||
      (tmpState.ore < maxOreNeeded)) {
      stack.push({ state: tmpState, op: 'nop' })
    }


    //  eval build geode bot only if have enough resources
    if (tmpState.obsidian >= blueprint.geodeRobotObsidianCost && tmpState.ore >= blueprint.geodeRobotOreCost) {
      stack.push({ state: tmpState, op: 'geodeBot' })
    }

    //  eval build obsidian bot only if have enough resources and less bots than needed
    if (tmpState.clay >= blueprint.obsidianRobotClayCost && tmpState.ore >= blueprint.obsidianRobotOreCost && tmpState.obsidian < maxObsidianNeeded) {
      stack.push({ state: tmpState, op: 'obsidianBot' })

    }

    //  eval build clay bot only if have enough resources and less bots than needed
    if (tmpState.ore >= blueprint.clayRobotOreCost && tmpState.bots.clay < maxClayNeeded) {
      stack.push({ state: tmpState, op: 'clayBot' })
    }

    //  eval build ore bot only if have enough resources and less bots than needed
    if (tmpState.ore >= blueprint.oreRobotOreCost && tmpState.bots.ore < maxOreNeeded) {
      stack.push({ state: tmpState, op: 'oreBot' })
    }


    i++
  }

  //  return acc
  return bestGeode
}

export const dumpSolutions = solutions => {
  const stream = solutions.reduce((acc, s) => acc + "\n" + JSON.stringify(s), "")
  fs.writeFile(path.resolve(__dirname, 'debug.txt'), "\n===\n\n" + stream, { flag: 'w' }, (err) => {
    if (err) {
      console.error('### error', err)
    }

  })
}

export const part1 = inputData => {
  const blueprints = buildModel(inputData)


  const result = blueprints.reduce((acc, blueprint) => {
    const solution = getBlueprintSolutions(blueprint, initialState)
    //
    return acc + blueprint.id * solution
  }, 0)



  return result
}

export const part2 = inputData => {
  const blueprints = buildModel(inputData).slice(0, 3)

  const result = blueprints.reduce((acc, blueprint) => {
    const solution = getBlueprintSolutions(blueprint, part2InitialState)
    //
    return acc * solution
  }, 1)

  return result
}