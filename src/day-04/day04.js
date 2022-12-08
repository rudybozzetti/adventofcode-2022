

export const stringToIntervals = s => {

  return s.trim().split(',').map(interval => interval.split('-').map(token => parseInt(token)))
}

export const fullyContains = ([startA, endA], [startB, endB]) => {

  return startA <= startB && endA >= endB

}

export const overlaps = ([startA, endA], [startB, endB]) => {

  return !(startA > endB || endA < startB)

}

export const part1 = data => {
  return data.split(/\n/).reduce((acc, line) => {
    const [a, b] = stringToIntervals(line)
    return fullyContains(a, b) || fullyContains(b, a) ? acc + 1 : acc
  }, 0)
}


export const part2 = data => {
  return data.split(/\n/).reduce((acc, line) => {
    const [a, b] = stringToIntervals(line)
    return overlaps(a, b) ? acc + 1 : acc
  }, 0)
}