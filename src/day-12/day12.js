
import { WeightedGraph } from './diikstra'


export const buildMap = input => {
  return input.split(/\n/).reduce((acc, line, rowIndex) => {
    return [
      ...acc,
      [...line.split('').map((cell, colIndex) => ({ id: `${rowIndex},${colIndex}`, h: cell === 'S' ? 'a' : cell === 'E' ? 'z' : cell, isStart: cell === 'S', isEnd: cell === 'E' }))],
    ]
  }, [])
}

export const diff = (from, to) => {
  return to.charCodeAt(0) - from.charCodeAt(0)

}

export const getTopCell = (map, rowIndex, colIndex) => {
  return rowIndex !== (map.length - 1) ? map[rowIndex + 1][colIndex] : undefined
}

export const getRightCell = (map, rowIndex, colIndex) => {
  return colIndex !== (map[0].length - 1) ? map[rowIndex][colIndex + 1] : undefined
}

export const getBottomCell = (map, rowIndex, colIndex) => {
  return rowIndex !== 0 ? map[rowIndex - 1][colIndex] : undefined
}

export const getLeftCell = (map, rowIndex, colIndex) => {
  return colIndex !== 0 ? map[rowIndex][colIndex - 1] : undefined
}

export const buildGraph = (map) => {
  const graph = new WeightedGraph()

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {

      //
      graph.addVertex(cell.id)

      const topCell = getTopCell(map, rowIndex, colIndex)
      const rightCell = getRightCell(map, rowIndex, colIndex)
      const bottomCell = getBottomCell(map, rowIndex, colIndex)
      const leftCell = getLeftCell(map, rowIndex, colIndex)


      //  top
      if (topCell && diff(cell.h, topCell.h) <= 1) {
        graph.addVertex(topCell.id)
        graph.addDirectedEdge(cell.id, topCell.id, 1)

      }
      //  right
      if (rightCell && diff(cell.h, rightCell.h) <= 1) {
        graph.addVertex(rightCell.id)
        graph.addDirectedEdge(cell.id, rightCell.id, 1)

      }
      //  bottom
      if (bottomCell && diff(cell.h, bottomCell.h) <= 1) {
        graph.addVertex(bottomCell.id)
        graph.addDirectedEdge(cell.id, bottomCell.id, 1)

      }
      //  left
      if (leftCell && diff(cell.h, leftCell.h) <= 1) {
        graph.addVertex(leftCell.id)
        graph.addDirectedEdge(cell.id, leftCell.id, 1)

      }
    })
  })

  return graph
}

export const findStartEnd = map => {
  return map.reduce((acc, row) => {
    return {
      ...row.reduce((_acc, cell) => {

        return {
          start: cell.isStart ? cell.id : _acc.start,
          end: cell.isEnd ? cell.id : _acc.end
        }

      }, acc)
    }

  }, {
    start: undefined,
    end: undefined
  })
}

export const part1 = input => {
  const map = buildMap(input)
  const graph = buildGraph(map)
  const { start, end } = findStartEnd(map)
  //
  const r = graph.Dijkstra(start, end)
  return r.length - 1
}

export const findAllStarts = map => {
  return map.reduce((acc, row) => {
    return [
      ...acc,
      ...row.filter(cell => cell.h === 'a').map(cell => cell.id)
    ]

  }, [])
}

export const part2 = input => {
  const map = buildMap(input)


  const { end } = findStartEnd(map)
  const allStarts = findAllStarts(map)

  const routes = allStarts.reduce((acc, start) => {
    const graph = buildGraph(map)
    const r = graph.Dijkstra(start, end)

    return [...acc, r.length - 1]

  }, [])

  const sorted = routes.filter(o => o > 0).sort((a, b) => a - b)

  return sorted[0]

}