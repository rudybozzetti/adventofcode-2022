

export const getInstructions = data => {
  return data.split(/\n/).reduce((acc, line) => [...acc, line.trim()]
    , [])
}

export const getState = (initialX, instructions) => {

  return instructions.reduce((acc, instruction, index) => {
    const [cmd, arg] = instruction.split(/\s+/).map((x, index) => index === 1 ? parseInt(x) : x)

    //  const prev = index > 0 ? acc[acc.length - 1] : initialX
    const prev = acc[acc.length - 1]

    if (cmd === 'noop') {
      return [...acc, prev]
    } else {
      return [...acc, prev, prev + arg]
    }


  }, [initialX])

}

export const getCycles = n => {
  return Array.from({ length: n - 1 }).reduce((acc, c, index) => [...acc, acc[acc.length - 1] + 40], [20])
}

export const getSignalStr = (state) => {
  const cycles = getCycles(6)

  const str = cycles.reduce((acc, cycle) => {
    return [...acc, state[cycle - 1] * cycle]

  }, [])

  return str
}

export const part1 = data => {
  const instructions = getInstructions(data)
  const state = getState(1, instructions)

  console.log('### state 218', state[218], 'state 219', state[219], 'state 220', state[220])
  const str = getSignalStr(state)

  console.log('### stre', str)
  //
  const sum = str.reduce((acc, curr) => acc + curr, 0)
  return sum

}

export const initScreen = () => {
  return Array.from({ length: 240 }).map(_ => '.').join('')
  /*
  const row = Array.from({ length: 40 }).map(_ => '.').join('')
  return [row,
    row,
    row,
    row,
    row,
    row,
  ]
  */
}

export const printScreen = s => {
  const x = [
    s.substring(0, 40),
    s.substring(40, 80),
    s.substring(80, 120),
    s.substring(120, 160),
    s.substring(160, 200),
    s.substring(200, 240),
  ]

  console.log('### x', x)
}

export const part2 = data => {
  const instructions = getInstructions(data)
  const state = getState(1, instructions)
  //
  const newScreen = Array.from({ length: 240 }).reduce((acc, _, cycle) => {
    const cX = cycle % 40
    const cY = Math.floor(cycle / 40)

    const X = state[cycle]
    //
    //console.log('## cX cY', cX, cY)
    //
    if (Math.abs(cX - X) > 1) {
      return [...acc, '.']

    } else {
      return [...acc, '#']
    }


  }, [])

  const s = newScreen.join('')


  console.log('### new screen', printScreen(s))


  return s


}