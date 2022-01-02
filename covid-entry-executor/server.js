const express = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const { startVaccinationMessageConsuming } = require('./services/VaccinationService')
const { startDeclarationMessageConsuming } = require('./services/DeclarationService')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

startVaccinationMessageConsuming()
// startDeclarationMessageConsuming()

console.log('Server started on: ' + port)