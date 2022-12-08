//  https://adventofcode.com/2022/day/1

export const prepareData = (data) => {
  return data.split(/\n/).reduce((acc, line) => {
    if(line.trim().length) {
      const toAdd = parseInt(line)

      return acc.length ? [...acc.slice(0,-1), acc[acc.length- 1] + toAdd]
      : [toAdd]

    } else {
      return [...acc, 0]
    }
  },[])
}

export const sumTop = (data,n) => {

  return data.sort( (a, b) => b-a).slice(0,3).reduce((acc, curr) => acc + curr,0)




}


