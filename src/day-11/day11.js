
export const execRound = (monkeys, relief = 3) => {
  const clone = monkeys.reduce((acc, monkey) => [...acc, { ...monkey, items: [...monkey.items] }], [])

  for (let monkey of clone) {
    monkey.items.forEach(worry => {
      const [newItem, dest] = monkey.next(worry, relief)
      clone[dest].items.push(newItem)
    })
    //
    monkey.inspected = monkey.inspected + monkey.items.length
    monkey.items = [] //monkey.items.splice(monkey.items.length)
    //

  }

  return clone
}

export const execRounds = (monkeys, rounds, relief = 3) => {

  return Array.from({ length: rounds }).reduce((acc, _) => {
    return execRound(acc, relief)

  }, monkeys)

}


export const part1 = (monkeys, rounds) => {
  const resMonkeys = execRounds(monkeys, rounds)
  const sorted = resMonkeys.sort((a, b) => b.inspected - a.inspected)


  return sorted[0].inspected * sorted[1].inspected

}

export const part2 = (monkeys, rounds) => {
  const resMonkeys = execRounds(monkeys, rounds, 1)
  const sorted = resMonkeys.sort((a, b) => b.inspected - a.inspected)



  return sorted[0].inspected * sorted[1].inspected
}