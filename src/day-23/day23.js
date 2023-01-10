
export const parseInput = data => {
  return data.split(/\n/).reduce((acc, line, row) => {
    const lineItems = line.split('').reduce((lineacc, o, col) => {
      return o === '#' ? [...lineacc, { x: col, y: row }] : lineacc
    }, [])
    return [...acc, ...lineItems]

  }, [])
}