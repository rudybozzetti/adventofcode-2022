
export const buildPairs = input => {
  return input.split(/\n/).reduce((acc, _line,index) => {
    const line = _line.trim()
    
    if(!line) {
      return [...acc, []]
    }

    const last = acc[acc.length -1] 

    return [
      ...acc.splice(0, acc.length -1),
      [...last, JSON.parse(line)]
    ]



  },[[]])
}

export const OK = 'OK'
export const KO = 'KO'
export const NEUTRAL = 'BOH'

export const isNumber = a => Number.isSafeInteger(a)

export const compareValues = (a,b) => {
  if(!isNumber(a)) throw Error('a is not a number')
  if(!isNumber(b)) throw Error('b is not a number')
  //
  return a < b ? OK : a > b ? KO :NEUTRAL
}


export const compareLists = (arrayA,arrayB ) => {
  if(!Array.isArray(arrayA)) throw Error('arrayA is not an array')
  if(!Array.isArray(arrayB)) throw Error('arrayB is not an array')
  //
  const result =  Array.from({length: Math.max(arrayA.length, arrayB.length)}).reduce((acc, _, index) => {
    if(acc === NEUTRAL) {
      //
      const left = arrayA[index]
      const right = arrayB[index]

      if(left === undefined && right !== undefined) {
        return OK
      }

      if(left !== undefined && right === undefined) {
        return KO
      }

      if(Array.isArray(left) && isNumber(right)) {
        return compareLists(left, [right])
      }

      if(isNumber(left) && Array.isArray(right)) {
        return compareLists([left], right)
      }
      
      if(Array.isArray(left) && Array.isArray(right)) {
        return compareLists(left, right)
      }

      if(isNumber(left) && isNumber(right)) {
        return compareValues(left, right)
      }
      
      throw Error(`shouldn't be here. left is`, typeof left, 'right is', typeof right)
    }


    return acc

  },NEUTRAL)
  
  return result
}

export const comparePairs = (pairs) => {
  return pairs.reduce((acc, [left, right]) => {
    return [
      ...acc,
      compareLists(left, right)
    ]

  }, [])
}

export const part1 = input => {
  const pairs = buildPairs(input)
  const comp = comparePairs(pairs)
  //
  const result = comp.reduce((acc, c, index) => {
    return c === OK ? acc+index+1:acc

  },0)

  return result

}

export const flattenPairs = pairs => pairs.reduce((acc, [left, right]) => [...acc, left, right],[])

export const sortPackets = (pairs) => {
  const sorted = pairs.sort((left, right) => {
    const result = compareLists(left, right)
    return result === OK ? -1 : result === KO ? 1:NEUTRAL
  } )

  return sorted
}

export const dividers = [
  [[2]],
  [[6]]
]


export const part2 = (input, _dividers) => {
  const pairs = buildPairs(input)
  const flattened = flattenPairs(pairs)

  const tmp = [
    ...flattened,
    ..._dividers
  ]
  
  const sorted = sortPackets(tmp)


  const result = sorted.reduce((acc, packet, index) => {
    return dividers.includes(packet) ? acc * (index+1):acc

  },1)

  return result
  
}