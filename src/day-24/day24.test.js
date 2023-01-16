

const testInput=`#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`
0123456

const testMapModel = {
  minx:0,
  miny:0,
  maxx: 7,
  maxy: 5,
  start: {x:1,y:0},
  end: {x:6,y:5}
}

const testBlizzardModel = [
  {dir: '>', x: 1,y:1},
  {dir: '>', x: 2,y:1},
  {dir: '<', x: 4,y:1},
  {dir: '^', x: 5,y:1},
  {dir: '<', x: 6,y:1},
  //
  {dir: '<', x: 2,y:2},
  {dir: '<', x: 5,y:2},
  {dir: '<', x: 6,y:2},
  //
  {dir: '>', x: 1,y:3},
  {dir: 'v', x: 2,y:3},
  {dir: '>', x: 4,y:3},
  {dir: '<', x: 5,y:3},
  {dir: '>', x: 6,y:3},
  //
  {dir: '<', x: 1,y:4},
  {dir: '^', x: 2,y:4},
  {dir: 'v', x: 3,y:4},
  {dir: '^', x: 4,y:4},
  {dir: '^', x: 5,y:4},
  {dir: '>', x: 6,y:4},
  
]