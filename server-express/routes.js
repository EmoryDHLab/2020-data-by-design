const express = require("express")
const router = express.Router()

const fs = require("fs")
const parse = require("csv-parse")
const transform = require("stream-transform")

const datasets = {
  0: "/static/data/SoH1500.csv",
  1: "/static/data/SoH1600.csv",
  2: "/static/data/SoH1700.csv",
  3: "/static/data/SoH1800.csv"
}

const toPeabodyFormat = (output, currentData) => {
  let [year, color, actor, eventType, desc] = currentData
  year = parseInt(year)
  eventType = parseInt(eventType)
  if (!output[year]) {
    output[year] = {}
  }
  if (!output[year][eventType]) {
    output[year][eventType] = []
  }
  output[year][eventType].push({
    year: year,
    color: color,
    actor: actor,
    eventType: eventType,
    desc: desc
  })
  return output
}

const peabodify = data => {
  let [year, color, actor, eventType, desc] = data
  year = parseInt(year)
  eventType = parseInt(eventType)
  return { year, color, actor, eventType, desc }
}

const loadDataset = function(datasetId) {
  const filePath = datasets[datasetId]
  return new Promise(function(resolve, reject) {
    if (!filePath) {
      reject({
        code: 400,
        message: "Dataset with id '" + datasetId + "' does not exist"
      })
      return;
    }
    let parser = parse({ delimiter: "," })
    let dataStream = fs.createReadStream(__dirname + filePath)
    let dataList = []
    dataStream
      .pipe(parser)
      .on("data", data => {
        dataList.push(peabodify(data))
      })
      .on("end", () => {
        let output = dataList.reduce((out, dat, i) => {
          out[i] = { ...dat, id: i }
          return out
        }, {})
        resolve({ id: datasetId, output })
      })
      .on("error", err => {
        console.log(err)
        reject({ code: 500, message: "Data corrupted, could not be sent" })
        return
      })
  })
}

router.get("/data/", (req, res) => {
  if (!req.query.full) {
    return res.status(200).send(JSON.stringify(Object.keys(datasets)))
  } else {
    const loadPromises = Object.keys(datasets).map(id => loadDataset(id))
    Promise.all(loadPromises).then(loadedDatasetsWithIds => {
      const out = loadedDatasetsWithIds.reduce((sets, dataset) => {
        sets[dataset.id] = dataset.output
        return sets
      }, {})
      res.status(200).send(JSON.stringify(out))
    })
  }
})

router.get("/data/:id", (req, res) => {
  const datasetId = parseInt(req.params.id)
  loadDataset(datasetId)
    .then(dataWithId => dataWithId.output)
    .then(data => res.status(200).send(JSON.stringify(data)))
    .catch(err => {
      res.status(err.code || 500).send(err.message)
    })
})

module.exports = router
