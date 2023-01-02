

export const mmod = (n, m) => ((n % m) + m) % m

export const parseInput = input => {
  return input.split(/\n/).map(n => parseInt(n))
}

export const getNewIndex = (n, i, mod) => {

  const newIndex = mmod((i + n), mod);

  return newIndex <= 0 ? newIndex + mod : newIndex
}

export const move = (numbers, n, oi) => {
  if (n === 0) return numbers
  //
  const i = numbers.findIndex(o => o.n === n && o.oi === oi)

  numbers.splice(i, 1)
  const newIndex = getNewIndex(n, i, numbers.length)
  numbers.splice(newIndex, 0, { n, oi })
  //
  return numbers
}

export const decrypt = numbers => {
  const tmp = numbers.map((n, oi) => ({ n, oi })) //  oi: original index
  const res = numbers.reduce(move, tmp)
  const result = res.map(({ n }) => n)
  return result
}


export const part1 = input => {
  const numbers = parseInput(input)
  const decrypted = decrypt(numbers)
  //console.log('### numbers.length', numbers.length, '### decrypted.length', decrypted.length)
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