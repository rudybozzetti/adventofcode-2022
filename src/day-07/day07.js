


export const parseLine = s => {

  const tokens = s.split(/\s+/)

  if (tokens[0] === '$') {
    return { type: 'cmd', cmd: tokens[1], arg: tokens[2] }
  }
  if (tokens[0] === 'dir') {
    return {
      type: 'd', name: tokens[1]
    }
  }
  if (/^\d+$/.test(tokens[0])) {
    return {
      type: 'f', name: tokens[1], size: parseInt(tokens[0])
    }
  }


}

export const buildFS = data => {
  const { fs } = data.split(/\n/).reduce((acc, line) => {
    const l = parseLine(line)
    if (l.type === 'cmd') {
      if (l.cmd === 'ls') {
        return {
          ...acc,
          currentCmd: l.cmd
        }
      }
      if (l.cmd === 'cd' && l.arg === '/') {
        return {
          ...acc,
          currentCmd: l.cmd,
          currentPath: [l.arg]
        }
      }
      if (l.cmd === 'cd' && l.arg === '..') {
        return {
          ...acc,
          currentCmd: l.cmd,
          currentPath: acc.currentPath.slice(0, -1)
        }
      }
      if (l.cmd === 'cd') {
        return {
          ...acc,
          currentCmd: l.cmd,
          currentPath: [...acc.currentPath, l.arg]
        }
      }
    }
    //

    const _path = acc.currentPath[0] + acc.currentPath.slice(1).join('/') + (l.type === 'd' ? `/${l.name}` : '')
    const path = _path.replace('//', '/')

    //
    return {
      ...acc,
      fs: [
        ...acc.fs,
        {
          ...l,
          path
        }
      ]
    }

  }, {
    currentPath: [],
    currentCmd: undefined,
    fs: [{
      type: 'd', name: '/', path: '/',
    }],
  })


  return fs
}

export const findDirSize = (fs) => {
  const m = fs.reduce((acc, entry) => {


    if (entry.type === 'd') {
      const size = fs.filter(e => e.path.startsWith(entry.path) && e.type === 'f').reduce((acc, curr) => acc + curr.size, 0)

      return {
        ...acc,
        [entry.path]: (acc[entry.path] || 0) + size
      }
    }

    return acc


  }, {})

  return m
}


export const findSuitableDir = (dirs, capacity, curr, required) => {
  const entries = Object.entries(dirs).sort((a, b) => a[1] - b[1])

  const suitable = entries.filter(([dirpath, size]) => (capacity - curr + size) > required)
  const sizemap = suitable.map(([_, size]) => size)

  return sizemap
}

export const part1 = data => {

  const dirSize = findDirSize(buildFS(data))

  return Object.values(dirSize).filter(s => s <= 100000).reduce((acc, curr) => acc + curr, 0)

}

export const part2 = data => {
  const dirSize = findDirSize(buildFS(data))
  const suitable = findSuitableDir(dirSize, 70000000, dirSize['/'], 30000000)

  return suitable[0]
}