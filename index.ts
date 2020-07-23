import express from 'express'
import { caclulateBmi } from './bmiCalculator'

const app = express()

app.get('/', (_req, res) => {
  res.send('pong')
})

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!weight || !height) {
    return res.json({
      rerror: 'malformatted parameters',
    })
  }

  const bmi = caclulateBmi(height, weight)

  return res.json({
    weight,
    height,
    bmi,
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
