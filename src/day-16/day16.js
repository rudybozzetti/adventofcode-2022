const fs = require('fs');
const path = require('path')

import floydWarshall from "../helpers/floyd-warshall"

export const buildGraph = input => {

  //  Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
  const re = /^Valve (\w{2}) has flow rate=(\d+); tunnels? leads? to valves? ([\w\s,]+)$/g

  return input.split(/\n/).reduce(([graph, rates], line) => {


    const [_, id, flow, dest] = [...line.matchAll(re)].pop()

    const dests = dest.split(',').map(x => x.trim())

    return [{
      ...graph,
      [id]: dests
    }, {
      ...rates,
      [id]: parseInt(flow)
    }]


  }, [{}, {}])

}


export const getSolutionScore = (solution, rates) => {
  return Object.entries(solution).reduce((acc, [valve, time]) => {
    return acc + (time * rates[valve])
  }, 0)
}

export const getSolutions = (distances, rates, valves, remainingTime, fromValve, chosen) => {
  const solutions = [chosen]

  for (let v of valves) {
    //  console.log('### solution from', fromValve, 'to',v,'time left', remainingTime)
    if (remainingTime < 2) {
      return solutions
    }

    //  -1 is the cost of opening the valve
    const newRemainingTime = remainingTime - distances[fromValve][v] - 1
    //  save next chosen valve for this solution
    const newChosen = { ...chosen, [v]: newRemainingTime }
    //  remove from available valves
    const newValves = valves.filter(_valve => _valve !== v)

    //  console.log('### newRemainingTime',newRemainingTime,'newChosen',newChosen,'newValves',newValves)

    const tmp = getSolutions(distances, rates, newValves, newRemainingTime, v, newChosen)

    for (let t of tmp) {
      solutions.push(t)
    }


  }


  return solutions
}

export const getOptimizedValves = (rates) => Object.entries(rates).reduce((acc, [valve, rate]) => {

  return rate === 0 ? acc : [
    ...acc,
    valve
  ]
}, [])

export const part1 = input => {
  const [graph, rates] = buildGraph(input)
  const distances = floydWarshall(graph)
  //
  const optimizedValves = getOptimizedValves(rates)

  const solutions = getSolutions(distances, rates, optimizedValves, 30, 'AA', {})

  const scores = solutions.map(s => getSolutionScore(s, rates)).sort((a, b) => b - a)

  return scores[0]

}

//


export const arrayIntersect = (a, b) => {
  const setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}

export const part2 = input => {
  const [graph, rates] = buildGraph(input)
  const distances = floydWarshall(graph)
  //
  const optimizedValves = getOptimizedValves(rates)

  const solutions = getSolutions(distances, rates, optimizedValves, 26, 'AA', {})


  const maxscores = new Map()

  for (const solution of solutions) {
    
    const key = Object.keys(solution).sort((a, b) => a > b ? 1: a<b ? -1:0).join(',')

    if (!maxscores.has(key)) {
      maxscores.set(key, getSolutionScore(solution, rates))
    } else {
      const score = getSolutionScore(solution, rates)
      if (score > maxscores.get(key)) {
      
        maxscores.set(key, score)
      }
    }

  }

  console.log('### maxscores',maxscores)

  let maxScore = 0

  let i = 0;
  for (const [_s1] of maxscores) {
    const s1 = _s1.split(',')

    for (const [_s2] of maxscores) {
      const s2 = _s2.split(',')

      //if (s1.length + s2.length >= optimizedValves.length - 2) {
        const intersection = arrayIntersect(s1, s2)
        if (intersection.length === 0) {
          const tryscore = maxscores.get(_s1) + maxscores.get(_s2)
          if(tryscore > maxScore) {
            maxScore = tryscore
            console.log('### new max score', maxScore, '# s1', _s1, '# s2',_s2, "# score1",maxscores.get(_s1),'# score2', maxscores.get(_s2))


          }
        }
      //}
    }

    i++

    if (i % 1000 === 0) {
      console.log('### s1 done', i, 'of', maxscores.size, '(', Math.round(100 * i / maxscores.size), '%)')
    }


  }


  //  console.log('### combinedScores', combinedScores)






  //  const scores = solutions.map(s => getSolutionScore(s, rates)).sort((a, b) => b - a)

  console.log('### result', maxScore)

  return maxScore

} 