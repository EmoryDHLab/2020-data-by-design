const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")
const parse = require("csv-parse")


const datasets = require("../../datasets.json")
const datasetFile = id => datasets.datasets[id] ? "/../../" + datasets.path + datasets.datasets[id] : false;

const loadDataset = function(datasetId) {
  const filePath = datasetFile(datasetId)
  return new Promise(function(resolve, reject) {
    if (!filePath) {
      reject({
        code: 400,
        message: "Dataset with id '" + datasetId + "' does not exist"
      })
      return;
    }
    const extension = path.extname(filePath)
    if (extension === ".csv") {
      //Assumes first row is property names
      const parser = parse({ delimiter: "," })
      const dataStream = fs.createReadStream(path.join(__dirname, filePath))
      let dataObjProps = []
      const dataList = []
      dataStream
        .pipe(parser)
        .on("data", data => {
          if (dataObjProps.length == 0) {
            dataObjProps = data;
          } else {
            const newObj = {};
            data.forEach( (propValue, index) => newObj[dataObjProps[index]] = propValue);
            dataList.push(newObj)
          }
        })
        .on("end", () => {
          let output = dataList;
          resolve({ id: datasetId, output })
        })
        .on("error", err => {
          console.error(err)
          reject({ code: 500, message: "Data corrupted, could not be sent" })
          return
        })
      } else if (extension === ".json") {
        fs.readFile(path.join(__dirname, filePath), 'utf8', function (err, data) {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve({id: datasetId, output: JSON.parse(data)});
       });
    }
  });
}

router.get("/", (req, res) => {
  if (!req.query.full) {
    return res.status(200).send(JSON.stringify(Object.keys(datasets.datasets)))
  } else {
    const loadPromises = Object.keys(datasets.datasets).map(id => loadDataset(id))
    Promise.all(loadPromises).then(loadedDatasetsWithIds => {
      const out = loadedDatasetsWithIds.reduce((sets, dataset) => {
        sets[dataset.id] = dataset.output
        return sets
      }, {})
      res.status(200).json(out)
    })
  }
})

router.get("/:id", (req, res) => {
  const datasetId = req.params.id;
  loadDataset(datasetId)
    .then(dataWithId => dataWithId.output)
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(err.code || 500).json({error: err.message})
    })
})

module.exports = router
