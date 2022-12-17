

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