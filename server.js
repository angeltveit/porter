const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000


app
  .use(bodyParser.json())
  .get('/', (req, res) => res.send('Porter 💂🏻 '))
  .use('/v1', require('./routes'), async function(error, req, res, next) {
    console.error(error.stack)
    res.json({ error: (error.message || 'Unknown error') })
  })
  
app.listen(port, () => console.log(`Porter is greeting on port ${port}! 💂🏻 `))