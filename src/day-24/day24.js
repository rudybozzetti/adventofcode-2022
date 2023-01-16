
export const blizzardTypes = ['<', '>', '^', 'v']

export const parseInput = input => {
  return input.split(/\n/).reduce((acc, line, rowIndex) => {
    const lineBlizzards = line.split('').reduce((blizzAcc, char, lineIndex) => {
      if (blizzardTypes.includes(char)) {
        return [
          ...blizzAcc,
          { dir: char, x: lineIndex, y: rowIndex }
        ]
      }
      return blizzAcc
    }, [])

    //
    if (rowIndex === 0) {
      const startX = line.indexOf('.')
      return {
        valley: {
          minx: 0,
          miny: 0,
          maxx: line.length - 1,
          start: { x: startX, y: 0 }
        },
        blizzards: [...acc.blizzards, ...lineBlizzards]
      }
    } else if ((line.match(/\./g) || []).length === 1) {
      const endX = line.indexOf('.')
      return {
        valley: {
          ...acc.valley,
          maxy: rowIndex,
          end: {
            x: endX, y: rowIndex
          }
        },
        blizzards: [...acc.blizzards, ...lineBlizzards]
      }
    }
    return {
      ...acc,
      blizzards: [...acc.blizzards, ...lineBlizzards]
    }
  }, { valley: {}, blizzards: [] })
}