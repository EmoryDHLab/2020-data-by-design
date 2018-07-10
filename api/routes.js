const express = require('express')
const router = express.Router()

const fs = require('fs')
const parse = require('csv-parse')
const transform = require('stream-transform')

const toPeabodyFormat = (output, currentData) => {
  let [year, color, actor, eventType, desc] = currentData
  year = parseInt(year)
  eventType = parseInt(eventType)
  if (!output[year]) { output[year] = {} }
  if (!output[year][eventType]) { output[year][eventType] = [] }
  output[year][eventType].push({
    year: year,
    color: color,
    actor: actor,
    eventType: eventType,
    desc: desc
  })
  return output
}

const peabodify = (data) => {
  let [year, color, actor, eventType, desc] = data
  year = parseInt(year)
  eventType = parseInt(eventType)
  return { year, color, actor, eventType, desc }
}

router.get('/', (req, res) => {
  res.send('Textbook API')
})

router.get('/data/:visType/:id', (req, res) => {
  const datasets = {
    peabody: [
      '/static/data/SoH1500.csv',
      '/static/data/SoH1600.csv',
      '/static/data/SoH1700.csv',
      '/static/data/SoH1800.csv'
    ]
  }
  const datasetId = parseInt(req.params.id)
  const visType = req.params.visType.toString()
  const filePath = datasets[visType][datasetId]
  if (!filePath) {
    return res.status(400).send("Dataset with id '" + datasetId + "' does not exist")
  }
  let parser = parse({delimiter:','})
  let dataStream = fs.createReadStream(__dirname + filePath)
  let dataList = []
  dataStream.pipe(parser).on('data', (data) => {
    dataList.push(peabodify(data))
  }).on('end', () => {
    let output = dataList.reduce((out, dat, i) => {
      out[i] = { ...dat, id: i }
      return out
    }, {})
    return res.status(200).send(JSON.stringify(output))
  }).on('error', (err) => {
    console.log(err)
    return res.status(500).send('Data corrupted, could not be sent')
  })
})

module.exports = router
