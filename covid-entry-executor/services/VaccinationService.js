const kafka = require('../config/kafka')
const { insertVaccination } = require('../models/VaccinationModel')

const topic = 'vaccination'

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic })
  await consumer.run({
    eachMessage: async ({ message }) => {
      await insertVaccination(JSON.parse(message.value)).catch(err => {
        console.error('Error while inserting vaccination', err)
      })
    }
  })
}

const startVaccinationMessageConsuming = async () => {
  consume().catch(async err => {
    console.error('Error while starting consuming vaccination message: ', err)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to disconnect vaccination consumer', e)
    }
  })
}

module.exports = {
  startVaccinationMessageConsuming
}