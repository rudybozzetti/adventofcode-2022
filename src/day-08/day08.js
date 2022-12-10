
export const prepareMap = (data) => {
  return data.split(/\n/).reduce((acc, line) => {
    return [
      ...acc,
      line.split('').map(o => parseInt(o))
    ]
  }, [])
}

export const visibleInRow = (cellValue, row, excludePos) => {
  const r1 = row.reduce((_, c, rIndex) => c >= cellValue && rIndex < excludePos ? false : _, true)
  const r2 = row.reduceRight((_, c, rIndex) => c >= cellValue && rIndex > excludePos ? false : _, true)

  return r1 || r2
}

export const countVisible = (map) => {
  return map.reduce((acc, row, rowIndex) => {
    return acc + row.reduce((rowAcc, cell, colIndex) => {

      if (rowIndex === 0 || colIndex === 0 || rowIndex === row.length - 1 || colIndex === row.length - 1) {
        return rowAcc + 1
      }

      const column = map.reduce((colAcc, _row, x) => {
        return [...colAcc, _row[colIndex]]
      }, [])

      const vRow = visibleInRow(cell, row, colIndex,)
      const vCol = visibleInRow(cell, column, rowIndex)


      if (vRow || vCol) {
        return rowAcc + 1
      }

      return rowAcc

    }, 0)

  }, 0)
}



export const scenicViewRow = (cellValue, row, excludePos) => {
  const _toRight = row.slice(excludePos + 1)
  const _toLeft = row.slice(0, excludePos)

  const viewToRight = _toRight.reduce((acc, c) => acc.stop ? acc : c >= cellValue ? ({
    ...acc,
    v: acc.v + 1,
    stop: true
  }) : ({
    ...acc,
    v: acc.v + 1
  }), {
    v: 0,
    stop: false
  })

  const viewToLeft = _toLeft.reduceRight((acc, c) => acc.stop ? acc : c >= cellValue ? ({
    ...acc,
    v: acc.v + 1,
    stop: true
  }) : ({
    ...acc,
    v: acc.v + 1
  }), {
    v: 0,
    stop: false
  })

  return viewToLeft.v * viewToRight.v
}

export const findBestScenicView = map => {
  const v = map.reduce((acc, row, rowIndex) => {
    const rowResult = row.reduce((rowAcc, cell, colIndex) => {

      const column = map.reduce((colAcc, _row, x) => {
        return [...colAcc, _row[colIndex]]
      }, [])

      const vRow = scenicViewRow(cell, row, colIndex,)
      const vCol = scenicViewRow(cell, column, rowIndex)

      return [...rowAcc, vRow * vCol]


    }, [])

    return [...acc, ...rowResult]

  }, [])

  const sorted = v.sort((a, b) => b - a)
  return sorted[0]
}

export const part1 = (data) => {
  return countVisible(prepareMap(data))
}

export const part2 = data => {
  return findBestScenicView(prepareMap(data))
}