

export const mmod = (n, m) => ((n % m) + m) % m

export const parseInput = input => {
  return input.split(/\n/).map(n => parseInt(n))
}

export const getNewIndex = (numbers, n, oi) => {
  const i = numbers.findIndex(o => o.n === n && o.oi === oi)

  return i + n <= 0
    ? mmod((i - 1 + n), numbers.length)
    : (i + n) > numbers.length
      ? mmod((i + 1 + n), numbers.length)
      : mmod((i + n), numbers.length)

}

export const move = (numbers, n, oi) => {
  if (n === 0) return numbers
  //
  const i = numbers.findIndex(o => o.n === n && o.oi === oi)
  const newIndex = getNewIndex(numbers, n, oi)
  numbers.splice(i, 1)
  numbers.splice(newIndex, 0, { n, oi })
  return numbers
}

export const decrypt = numbers => {
  const tmp = numbers.map((n, oi) => ({ n, oi }))
  const res = numbers.reduce(move, tmp)
  const result = res.map(({ n }) => n)
  return result
}


export const part1 = input => {
  const numbers = parseInput(input)
  const decrypted = decrypt(numbers)


  console.log('### numbers.length', numbers.length, '### decrypted.length', decrypted.length)
  //
  const pos = decrypted.indexOf(0)
  //
  const n1000th = decrypted[(pos + 1000) % numbers.length]
  const n2000th = decrypted[(pos + 2000) % numbers.length]
  const n3000th = decrypted[(pos + 3000) % numbers.length]
  console.log('### n1000th', n1000th)
  console.log('### n2000th', n2000th)
  console.log('### n3000th', n3000th)

  return n1000th + n2000th + n3000th
}