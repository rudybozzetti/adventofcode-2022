const testMCD = 23 * 19 * 13 * 17

export const testMonkeys = [
  {
    inspected: 0,
    items: [79, 98],
    next: (item, relief) => {
      const w = relief === 1 ? item * 19 : Math.floor(item / relief * 19)
      //

      //
      return w % 23 === 0 ? [w % testMCD, 2] : [w % testMCD, 3]
    }
  },
  {
    inspected: 0,
    items: [54, 65, 75, 74],
    next: (item, relief) => {
      const w = relief === 1 ? (item + 6) : Math.floor((item + 6) / relief)
      return w % 19 === 0 ? [w % testMCD, 2] : [w % testMCD, 0]
    }
  },
  {
    inspected: 0,
    items: [79, 60, 97],
    next: (item, relief) => {

      const w = relief === 1 ? (item * item) : Math.floor((item / relief * item))
      return w % 13 === 0 ? [w % testMCD, 1] : [w % testMCD, 3]
    }
  },
  {
    inspected: 0,
    items: [74],
    next: (item, relief) => {
      const w = relief === 1 ? (item + 3) : Math.floor((item + 3) / relief)
      return w % 17 === 0 ? [w % testMCD, 0] : [w % testMCD, 1]
    }
  }

]

const dayMCD = 7 * 13 * 5 * 19 * 2 * 11 * 17 * 3

export const dayMokeys = [
  {
    inspected: 0,
    items: [66, 79],
    next: (item, relief) => {
      const w = relief === 1 ? item * 11 : Math.floor((item * 11) / relief)
      return w % 7 === 0 ? [w % dayMCD, 6] : [w % dayMCD, 7]
    }
  }, {
    inspected: 0,
    items: [84, 94, 94, 81, 98, 75],
    next: (item, relief) => {
      const w = relief === 1 ? item * 17 : Math.floor((item * 17) / relief)
      return w % 13 === 0 ? [w % dayMCD, 5] : [w % dayMCD, 2]
    }
  }, {
    inspected: 0,
    items: [85, 79, 59, 64, 79, 95, 67],
    next: (item, relief) => {
      const w = relief === 1 ? item + 8 : Math.floor((item + 8) / relief)
      return w % 5 === 0 ? [w % dayMCD, 4] : [w % dayMCD, 5]
    }
  }, {
    inspected: 0,
    items: [70],
    next: (item, relief) => {
      const w = relief === 1 ? item + 3 : Math.floor((item + 3) / relief)
      return w % 19 === 0 ? [w % dayMCD, 6] : [w % dayMCD, 0]
    }
  }, {
    inspected: 0,
    items: [57, 69, 78, 78],
    next: (item, relief) => {
      const w = relief === 1 ? item + 4 : Math.floor((item + 4) / relief)
      return w % 2 === 0 ? [w % dayMCD, 0] : [w % dayMCD, 3]
    }
  }, {
    inspected: 0,
    items: [65, 92, 60, 74, 72],
    next: (item, relief) => {
      const w = relief === 1 ? item + 7 : Math.floor((item + 7) / relief)
      return w % 11 === 0 ? [w % dayMCD, 3] : [w % dayMCD, 4]
    }
  }, {

    inspected: 0,
    items: [77, 91, 91],
    next: (item, relief) => {
      const w = relief === 1 ? item * item : Math.floor((item * item) / relief)
      return w % 17 === 0 ? [w % dayMCD, 1] : [w % dayMCD, 7]
    }
  }, {

    inspected: 0,
    items: [76, 58, 57, 55, 67, 77, 54, 99],
    next: (item, relief) => {
      const w = relief === 1 ? item + 6 : Math.floor((item + 6) / relief)
      return w % 3 === 0 ? [w % dayMCD, 2] : [w % dayMCD, 1]
    }
  }
]

