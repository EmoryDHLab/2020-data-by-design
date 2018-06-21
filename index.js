const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const apiRouter = require('./api/routes.js')
app.use('/static', express.static(path.resolve(__dirname + '/dist/static')));

app.get('/', function(req, res) {
  console.log('Hi')
  fs.readFile(path.resolve(__dirname + '/dist/index.html'), (f) => {
    console.log(f)
  })
  res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});

app.use('/api', apiRouter)

app.listen(3000, () => console.log('DataByDesign api listening on port 3000'))
