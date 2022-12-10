import { buildFS, parseLine, findDirSize, findSuitableDir, part1, part2 } from './day07'

describe('day07', () => {

  const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`





  const testFS = [
    { name: '/', path: '/', type: 'd' },
    { name: 'a', path: '/a', type: 'd' },
    { name: 'b.txt', path: '/', type: 'f', size: 14848514 },
    { name: 'c.dat', path: '/', type: 'f', size: 8504156 },
    { name: 'd', path: '/d', type: 'd' },
    { name: 'e', path: '/a/e', type: 'd' },
    { name: 'f', path: '/a', type: 'f', size: 29116 },
    { name: 'g', path: '/a', type: 'f', size: 2557 },
    { name: 'h.lst', path: '/a', type: 'f', size: 62596 },
    { name: 'i', path: '/a/e', type: 'f', size: 584 },
    { name: 'j', path: '/d', type: 'f', size: 4060174 },
    { name: 'd.log', path: '/d', type: 'f', size: 8033020 },
    { name: 'd.ext', path: '/d', type: 'f', size: 5626152 },
    { name: 'k', path: '/d', type: 'f', size: 7214296 },
  ]


  it('parseLine should return expected results', () => {
    expect(parseLine('$ cd /')).toStrictEqual(
      { type: 'cmd', cmd: 'cd', arg: '/' }
    )

    expect(parseLine('$ cd ..')).toStrictEqual(
      { type: 'cmd', cmd: 'cd', arg: '..' }
    )

    expect(parseLine('$ cd a')).toStrictEqual(
      { type: 'cmd', cmd: 'cd', arg: 'a' }
    )

    expect(parseLine('$ ls')).toStrictEqual(
      { type: 'cmd', cmd: 'ls', arg: undefined }
    )

    expect(parseLine('dir a')).toStrictEqual(
      { type: 'd', name: 'a' }
    )

    expect(parseLine('62596 h.lst')).toStrictEqual(
      { type: 'f', name: 'h.lst', size: 62596 }
    )
  })




  it('buildFS should return expected result', () => {
    const result = buildFS(testInput)
    result.forEach(r => {

      const m = testFS.find(e => e.name === r.name && e.path === r.path && e.type === r.type)

      expect(m).toEqual(r)
    })



  })

  it('findDirSize should return expected result', () => {
    const result = findDirSize(testFS, 10000)

    expect(result).toStrictEqual({ "/": 48381165, "/a": 94853, "/a/e": 584, "/d": 24933642 })
  })

  it('findSuitableDir should return expexted result', () => {
    const result = findSuitableDir({ "/": 48381165, "/a": 94853, "/a/e": 584, "/d": 24933642 }, 70000000, 48381165, 30000000)
    expect(result).toStrictEqual([
      24933642,
      48381165,
    ])
  })

  it('part1 should return expected result', () => {
    expect(part1(testInput)).toBe(95437)
  })
  it('part2 should return expected result', () => {
    expect(part2(testInput)).toBe(24933642)
  })
})