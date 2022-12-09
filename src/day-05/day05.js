

export const getArrangementAndMoves = data => {
  //return data.split(/[&#xd;\n\r]{2,}/).map(s => s.trimEnd())

  return data.split(/\n/).reduce(([arrangement, moves], line) => {

    if(line.startsWith('move')) {
      return [arrangement, [...moves, line.trimEnd()]]
    } else if (!line.trimEnd() || line.match(/\s+1\s+2\s+3/)) {
      return [arrangement, moves]
    } else {
      return [[...arrangement, line.trimEnd()], moves]
    }

  },[[],[]])
}

export const getArrangement = array => {
  const re = RegExp('\\[([A-Z])]','g')

  return array.reduce((acc, line, index) => {
    const matches = Array.from(line.matchAll(/\[([A-Z])]/g))

    return matches.reduce((theAcc, theMatch )=> {
      const stackIndex = (theMatch.index / 4) + 1


      return {
        ...theAcc,
        [stackIndex]: [theMatch[1], ...(theAcc[stackIndex] || [])]
      }

    }, acc)
  },{})
}

export const getMoves = (array) => {
  return array.reduce((acc, line) => {
    const matches = Array.from(line.matchAll(/move\s+(\d+)\s+from\s+(\d+)\s+to\s+(\d+)/g))

    return [...acc, [
      parseInt(matches[0][1]),
      parseInt(matches[0][2]),
      parseInt(matches[0][3]),
    ]]

  },[])

}

export const applyMoves = (_arrangement, moves, newModel = false) => {

  return moves.reduce((arrangement, [amount, from, to]) => {
    const toBeMoved =
    newModel 
      ? arrangement[from].slice(-amount)
      : arrangement[from].slice(-amount).reverse()

    return {
      ...arrangement,
      [from]: arrangement[from].slice(0, -amount),
      [to]: [...arrangement[to], ...toBeMoved]
    }


  },_arrangement)

}

export const getTopStock = arrangement => {
  return Object.entries(arrangement).reduce((acc, [key, value]) => {
    return acc + value.slice(-1)
  },'')
}

export const part1 = data => {
  const [arrangementRaw, movesRaw ]=getArrangementAndMoves(data)
  const arrangement = getArrangement(arrangementRaw)
  const moves = getMoves(movesRaw)
  const newArrangement = applyMoves(arrangement,moves)
  const result = getTopStock(newArrangement)

  return result
}

export const part2 = data => {
  const [arrangementRaw, movesRaw ]=getArrangementAndMoves(data)
  const arrangement = getArrangement(arrangementRaw)
  const moves = getMoves(movesRaw)
  const newArrangement = applyMoves(arrangement,moves, true)
  const result = getTopStock(newArrangement)

  return result
}