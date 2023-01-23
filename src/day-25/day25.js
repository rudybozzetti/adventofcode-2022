
export const parseInput = input => {
  return input.split(/\n/).reduce((acc, line) => {
    return [...acc, fromSNAFU(line)]
  }, [])
}

export const cyphers = {
  '2': 2,
  '1': 1,
  '0': 0,
  '-': -1,
  '=': -2
}

export const fromSNAFU = snafu => {
  return snafu.split('').reduceRight((acc, c, index) => {
    const exp = snafu.length - index - 1
    return acc + cyphers[c] * Math.pow(5, exp)
  }, 0)
}

export const log = (n, base) => Math.log(n) / Math.log(base)

export const toSNAFU = (n) => {
  const stack = [n]
  let result = ''
  let result2 = ''

  while(stack.length) {
    const x = stack.pop()
    //
    const div = Math.floor( x / 5)
    const mod = x % 5

    if(mod === 4) {
      //  5 - 1
      result = '-' + result
      stack.push(div + 1)
    } else if (mod === 3) {
      //  5 - 2
      result = '=' +result
      stack.push(div + 1)
    } else if (div > 0) {
      result = mod + result
      stack.push(div)
    } else {
      result = mod + result
    }

    

  }

  return result
}

export const part1 = input => {
  const model = parseInput(input)
  const sum = model.reduce((acc, n) => acc +n, 0)

  const result = toSNAFU(sum)

  return result
}

export const part2 = input => {
  
}