

export const findMarker = (s, packetLength) => {
  for (let x = 0; x < s.length; x++) {
    const test = s.substring(Math.max(x - (packetLength - 1), 0), x)

    const set = new Set(test.split(''))
    if (set.size === (packetLength - 1) && !set.has(s[x])) {
      return x + 1
    }
  }
}

export const part1 = (data) => {
  return findMarker(data, 4)
}

export const part2 = (data) => {
  return findMarker(data, 14)
}