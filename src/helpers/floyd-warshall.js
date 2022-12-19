//  https://it.wikipedia.org/wiki/Algoritmo_di_Floyd-Warshall


export const initDistances = graph => {
  const n = Object.keys(graph).length
  return Array.from({length: n}).reduce((acc, _) => ([...acc, Array.from({length:n})]),[])
}


export const weight = (graph, from, to) => {
  const entry = graph[from]
  //
  if(from === to ){
    //  arco su sè stesso
    return 0
  }
  //
  const unweighted = Array.isArray(entry) && typeof entry[0] === typeof from
  //
  if(unweighted) {
    return entry.includes(to) ? 1: Number.POSITIVE_INFINITY
  }


  return entry[to] === undefined ? Number.POSITIVE_INFINITY : entry[to]
}

/**
 * @param {Object} graph
 * @param {string[]} graph[from]
 * 
 * 
 * return {Object} distances
 * distances[from][to] = minimum distance between from and to
 */
const floydWarshall = (graph) => {
  const n = Object.keys(graph).length
  const dist = {}
  const prev = {}
  //
  const graphNodes = Object.keys(graph)

  //  assign weights
  for(let i = 0; i<n; i++) {
    const from = graphNodes[i]

    for(let j=0; j<n; j++ ) {
      const to = graphNodes[j]
      
      if(dist[from] === undefined) {
        dist[from] = {}
      }
      if(dist[from][to] == undefined)  {
        dist[from][to] = {}
      }
      //
      if(prev[from] === undefined) {
        prev[from] = {}
      }
      if(prev[from][to] == undefined)  {
        prev[from][to] = {}
      }
      //
      dist[from][to] = weight(graph, from,to)
      prev[from][to] = from
    }
  }

  //  
  for(let h = 0; h<n; h++ ) {
    const hNode = graphNodes[h]

    for(let i = 0; i<n; i++) {
      const from = graphNodes[i]
  
      for(let j=0; j<n; j++ ) {
        const to = graphNodes[j]
        
        if (dist[from][to] > dist[from][hNode] + dist[hNode][to]) {
          dist[from][to] = dist[from][hNode] + dist[hNode][to];
          prev[from][to] = prev[hNode][to];
        }
      }
    }
  }

  return dist
}

export default floydWarshall