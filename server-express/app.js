const express = require("express")
const app = express()
const proxy = require("http-proxy-middleware")

const port = 3000

const routes = require("./routes")

/*app.use(
  "/api",
  proxy({ target: "http://[::1]:8080", changeOrigin: true })
)*/

app.use("/api/", routes)

app.listen(port, () => console.log("Listening on port " + port))
