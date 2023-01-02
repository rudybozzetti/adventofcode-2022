

export const parseInput = input => {
  return input.split(/\n/).reduce((acc, line) => {
    //
    const tokens = line.split(':')
    const name = tokens[0]
    const yell = tokens[1].trim().match(/\d+/) ? parseInt(tokens[1]) : undefined

    //  console.log('### name', name, '### yell', yell, '###')

    const ops = tokens[1].trim().split(/\s/)

    return [
      ...acc,
      {
        name,
        yell,
        ...(yell ? {} : {
          name1: ops[0].trim(),
          name2: ops[2].trim(),
          op: ops[1].trim()
        })
      }
    ]

  }, [])
}

export const solve = (model) => {
  for (const item of model) {
    const { name, yell, name1, name2, op } = item

    if (yell) {
      item['f'] = () => yell
    } else {
      item['f'] = () => {
        const m1 = model.find(o => o.name === name1)
        const m2 = model.find(o => o.name === name2)

        return Promise.all([m1.f(), m2.f()]).then(([m1Result, m2Result]) => {
          switch (op) {
            case '+':
              return m1Result + m2Result

            case '-':
              return m1Result - m2Result

            case '*':
              return m1Result * m2Result

            case '/':
              return m1Result / m2Result
          }
        })
      }
    }
  }

  //
  const root = model.find(o => o.name === 'root')

  return root.f()
}

export const part1 = (input) => {
  const model = parseInput(input)
  //
  const result = solve(model)

  return result
}