

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

//

export const isFormula = s => {
  return typeof s === 'string' ? /\(\w+\s[+\-*\/=]\s\w+\)/.test(s) : false
}

export const parseFormula = s => {

}


export const solveSimepleExpr = (left, op, right) => {

  if (isFormula(left)) {
    const matches = left.match(/\((\w+)\s([+\-*/=])\s(\w+)\)/)
    console.log('### matches', matches)



  } else if (isFormula(right)) {
    const matches = right.match(/\((\w+)\s([+\-*/=])\s(\w+)\)/)

    if (matches[1] === 'x') {
      return `(${left} ${op} x ${matches[2]} ${solveSimepleExpr(left, op, parseInt(matches[3]))})`
    } else {
      return `(${solveSimepleExpr(left, op, parseInt(matches[1]))} ${matches[2]} ${left} ${op} x)`
    }


  } else {
    switch (op) {
      case '+':
        return left + right

      case '-':
        return left - right

      case '*':
        return left * right

      case '/':
        return left / right

      case '=':
        return left === right
    }
  }
}

export const findMonkey = (monkeys, name) => {
  return monkeys.find(o => o.name === name)
}

export const calcMonkeyValue = (left, right, op) => {
  console.log('### calcMonkeyValue left, right, op', left, right, op)
  switch (op) {
    case '+':
      return left + right

    case '-':
      return left - right

    case '*':
      return left * right

    case '/':
      return left / right

  }
}

export const calcMonkeyInverseValue = (left, right, op, isLeft) => {
  console.log('### calcMonkeyInverseValue left, right, op, isLeft', left, right, op, isLeft)
  switch (op) {
    case '+':
      return right - left

    case '-':
      return isLeft ? left + right : left - right

    case '*':
      return right / left

    case '/':
      return isLeft ? left * right : left / right

  }
}

export const getMonkeyValue = (monkeys, monkey) => {
  console.log('### getMonkeyValue monkey', monkey)
  if (monkey.yell !== undefined) {
    console.log('### getMonkeyValue', monkey.name, "result", monkey.yell)
    return monkey.yell
  }

  const m1 = findMonkey(monkeys, monkey.name1)
  const m2 = findMonkey(monkeys, monkey.name2)

  const result = calcMonkeyValue(getMonkeyValue(monkeys, m1), getMonkeyValue(monkeys, m2), monkey.op)

  console.log('### getMonkeyValue', monkey.name, "result", result)

  return result

}

export const evalMonkey = (monkey, monkeys) => {
  const parent = monkeys.find(o => o.name1 === monkey.name || o.name2 === monkey.name)
  //
  console.log('### evalMonkey', monkey.name, 'parent ', parent, 'of', monkey)

  const targetName = parent.name1 === monkey.name ? parent.name2 : parent.name1
  const m = findMonkey(monkeys, targetName)

  console.log('### evalMonkey targetName ', targetName)

  if (parent.name === 'root') {
    const result = getMonkeyValue(monkeys, m)
    console.log('### evalMokey ', monkey.name, "result", result)
    return result
  }

  const result = calcMonkeyInverseValue(getMonkeyValue(monkeys, m), evalMonkey(parent, monkeys), parent.op, parent.name1 === monkey.name)

  console.log('### evalMokey reverse', monkey.name, "result", result)

  return result
}

export const solve2 = (monkeys) => {
  const root = monkeys.find(o => o.name === 'root')
  root['op'] = '='

  const humn = monkeys.find(o => o.name === 'humn')
  humn['yell'] = 'x'

  const x = evalMonkey(humn, monkeys)

  console.log('### x', x)



  //

  return x

}

export const part2 = (input) => {
  const model = parseInput(input)
  //
  const result = solve2(model)

  return result
}


//  x = 3453748220116
