
export const buildModel = input => {
  return input.split(/\n/).reduce((acc, line) => {
    const [
      [id],
      [oreRobotCost],
      [clayRobotCost],
      [obsidianRobotOreCost],
      [obsidianRobotClayCost],
      [geodeRobotOreCost],
      [geodeRobotObsidianCost]
    ] = [...line.matchAll(/\d+/g)]

    return [
      ...acc,
      {
        id: parseInt(id),
        oreRobotCost: parseInt(oreRobotCost),
        clayRobotCost: parseInt(clayRobotCost),
        obsidianRobotOreCost: parseInt(obsidianRobotOreCost),
        obsidianRobotClayCost: parseInt(obsidianRobotClayCost),
        geodeRobotOreCost: parseInt(geodeRobotOreCost),
        geodeRobotObsidianCost: parseInt(geodeRobotObsidianCost),
      }
    ]

  }, [])
}