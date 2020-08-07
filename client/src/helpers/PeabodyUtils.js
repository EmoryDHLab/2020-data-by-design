const actorColors = {
  "England": "rgb(119,43,21)",
  "Americas": "rgb(222,145,49)",
  "France": "rgb(60,100,100)",
  "Holland": "rgb(68,108,73)",
  "Sweden": "rgb(247, 235, 5)"
}

const dataToYears = data => {
  return data.reduce((yearsObj, curr) => {
    if (!yearsObj[curr.year]) {
      yearsObj[curr.year] = Array(9).fill(undefined);
    }
    if (curr.squares === "full") {
      if (curr.actors.length == 2) {
        const top = [curr.actors[0]];
        const bottom = [curr.actors[1]];
        const both = [curr.actors[0], curr.actors[1]];
        const actorsArr = [top, top, both,
          top, both, bottom,
          both, bottom, bottom];
        yearsObj[curr.year] = actorsArr.map (actors => ({event: curr.event, actors}))
      } else {
        yearsObj[curr.year] = Array(9).fill({event: curr.event, actors: curr.actors})
      }
    } else {
      curr.squares.forEach(squareNum =>
        yearsObj[curr.year][squareNum - 1] = {event: curr.event, actors: curr.actors}
      );
    }
    return yearsObj
  }, {})
}

export { actorColors, dataToYears }
