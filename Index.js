const express = require('express')
const app = express()
const port = 3000
var cors = require("cors")

const boardAPI = require("./board/boardAPI")
app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/board', (req, res) => {
  res.send(boardAPI.board)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})