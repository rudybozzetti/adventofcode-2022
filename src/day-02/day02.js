

export const PLAY_ROCK = 'A'
export const PLAY_PAPER = 'B'
export const PLAY_SCISSORS = 'C'

export const RESP_ROCK = 'X'
export const RESP_PAPER = 'Y'
export const RESP_SCISSORS = 'Z'


export const SCORE_ROCK = 1
export const SCORE_PAPER = 2
export const SCORE_SCISSORS = 3

export const SCORE_LOSS = 0
export const SCORE_DRAW = 3
export const SCORE_WIN = 6

export const SCORES = {
  [RESP_ROCK]: SCORE_ROCK,
  [RESP_PAPER]: SCORE_PAPER,
  [RESP_SCISSORS]: SCORE_SCISSORS,
  [PLAY_ROCK]: {
    [RESP_ROCK]: SCORE_DRAW,
    [RESP_PAPER]: SCORE_WIN,
    [RESP_SCISSORS]: SCORE_LOSS,
  },
  [PLAY_PAPER]: {
    [RESP_ROCK]: SCORE_LOSS,
    [RESP_PAPER]: SCORE_DRAW,
    [RESP_SCISSORS]: SCORE_WIN,
  },
  [PLAY_SCISSORS]: {
    [RESP_ROCK]: SCORE_WIN,
    [RESP_PAPER]: SCORE_LOSS,
    [RESP_SCISSORS]: SCORE_DRAW
  }
}

export const STRAT_LOSE = 'X'
export const STRAT_DRAW = 'Y'
export const STRAT_WIN = 'Z'

export const STRAT_SCORES = {
  [PLAY_ROCK]: {
    [STRAT_LOSE]: SCORE_LOSS + SCORE_SCISSORS,
    [STRAT_DRAW]: SCORE_DRAW + SCORE_ROCK,
    [STRAT_WIN]: SCORE_WIN + SCORE_PAPER
  },
  [PLAY_PAPER]: {
    [STRAT_LOSE]: SCORE_LOSS + SCORE_ROCK,
    [STRAT_DRAW]: SCORE_DRAW + SCORE_PAPER,
    [STRAT_WIN]: SCORE_WIN + SCORE_SCISSORS
  },
  [PLAY_SCISSORS]: {
    [STRAT_LOSE]: SCORE_LOSS + SCORE_PAPER,
    [STRAT_DRAW]: SCORE_DRAW + SCORE_SCISSORS,
    [STRAT_WIN]: SCORE_WIN + SCORE_ROCK
  }
}





export const getScore = (data) => {
  return data.split(/\n/).reduce((acc, line) => {
    const [play, resp] = line.split(/\s+/).map(o => o.trim())

    //  console.log('### play', play, 'resp', resp, 'score for resp', SCORES[resp], 'score for match', SCORES[play][resp])

    return acc + SCORES[resp] + SCORES[play][resp]
  }, 0)
}

export const getStratScore = (data) => {
  return data.split(/\n/).reduce((acc, line) => {
    const [play, strat] = line.split(/\s+/).map(o => o.trim())

    //  console.log('### play', play, 'strat', strat, 'score', STRAT_SCORES[play][strat])

    return acc + STRAT_SCORES[play][strat]
  }, 0)
}
