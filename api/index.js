const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()

const router = express.Router()
const projectId = process.env.PROJECT_ID
const apiKey = process.env.API_KEY
const url = 'https://api.aiforthai.in.th/t-face/base64/' + projectId

router.get('/test', (_req, res) => {
  res.send({ message: 'hello' })
})

router.post('/tface', async (req, res) => {
  const ret = await axios
    .post(
      url,
      { image: req.body.image },
      {
        headers: {
          'Content-Type': 'application/json',
          Apikey: apiKey,
        },
      }
    )
    .catch((error) => {
      return res.status(500).json({
        message: 'Error saving record',
        error,
      })
    })
  // eslint-disable-next-line no-console
  // console.log(ret)
  res.send(ret.data)
})

app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(router)
module.exports = {
  path: '/api',
  handler: app,
}
