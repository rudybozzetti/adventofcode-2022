

export const parseInput = input => {
  return input.split(/\n/).map(n => parseInt(n))
}

export const decrypt = numbers => {

  return numbers.reduce((acc, n) => {

    if (n === 0) return acc

    const i = acc.indexOf(n)

    //
    //  console.log('### index of', n, 'is', i)
    //
    const newIndex = (i + n) % numbers.length > 0 ? (i + n) % numbers.length : ((i + n) % numbers.length) + numbers.length - 1

    //  console.log('### newIndex', newIndex)

    if (i < newIndex) {
      const result = [...acc.slice(0, i), ...acc.slice(i + 1, newIndex + 1), n, ...acc.slice(newIndex + 1)]

      //  console.log('### from', acc, 'to result', result)

      return result
    } else {
      const result = [...acc.slice(0, newIndex + 1), n, ...acc.slice(newIndex + 1, i), ...acc.slice(i + 1)]

      //  console.log('### from', acc, 'to result', result)

      return result
    }







  }, [...numbers])


}

export const part1 = input => {
  const numbers = parseInput(input)
  const decrypted = decrypt(numbers)
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