

export const intersect = (a, b) => {
  const setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}

export const stringIntersection = (a, b) => {
  return intersect(a.split(''), b.split('')).join()
}

export const getTypePriority = s => {
  const code = s.charCodeAt(0)

  return (code >= 97 && code <= 122) ? code - 96 : (code >= 65 && code <= 90) ? code - 38 : undefined
}

export const splitLine = s => {
  return [s.substring(0, s.length / 2), s.substring(s.length / 2)]
}

export const getPrioritySum = (data) => {
  return data.split(/\n/).reduce((acc, line) => {
    const [a, b] = splitLine(line)

    //  console.log('### play', play, 'strat', strat, 'score', STRAT_SCORES[play][strat])

    return acc + getTypePriority(stringIntersection(a, b))
  }, 0)

}