const express = require('express')
const router = express.Router()

const fs = require('fs')
const parse = require('csv-parse')
const transform = require('stream-transform')

router.get('/', (req, res) => {
  res.send('Textbook API')
})

router.get('/data/:id', (req, res) => {
  const datasets = [
    '/static/data/SoH1500.csv',
    '/static/data/SoH1600.csv',
    '/static/data/SoH1700.csv',
    '/static/data/SoH1800.csv'
  ]
  const datasetId = parseInt(req.params.id)
  const filePath = datasets[datasetId]
  if (!filePath) {
    return res.status(400).send("Dataset with id '" + datasetId + "' does not exist")

  }
  let parser = parse({delimiter:','})
  let dataStream = fs.createReadStream(__dirname + filePath)
  let output = {}
  dataStream.pipe(parser).on('data', (data) => {
    console.log(data)
    let [year, color, actor, eventType, desc] = data
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
  }).on('end', () => {
    return res.status(200).send(JSON.stringify(output))
  }).on('error', (err) => {
    console.log(err)
    return res.status(500).send('Data corrupted, could not be sent')
  })
})

module.exports = router
