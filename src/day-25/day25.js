
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

export const toSNAFU = (n) => {
  /*
const count = Math.ceil(Math.pow(n, 1 / 5))
//
const x = n / Math.pow(count, 5)
console.log('### x', x)

if (x > 0) {
  const r = n - Math.pow(count - 1, 5)
  console.log('### rr', r)
}




console.log('### count', count)
const base = Math.pow(5, count)
console.log('### base', base)
console.log('### next', Math.pow(5, count - 1))

console.log('### -', n - Math.pow(5, count - 1))
console.log('### =', n - 2 * Math.pow(5, count - 1))

*/

}