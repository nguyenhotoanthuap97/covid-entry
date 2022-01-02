const kafka = require('../config/kafka')
const { insertVaccination } = require('../models/VaccinationModel')
const { insertDeclaration } = require('../models/DeclarationModel')

const vaccinationTopic = 'covid-vaccination'
const declarationTopic = 'covid-declaration'
const assignedTopic = process.env.KAFKA_TOPIC || ''
const assignedPartition = process.env.KAFKA_ASSIGNED_PARTITION

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })

const consume = async () => {
  await consumer.connect()
  if (assignedTopic.includes(vaccinationTopic)) {
    await consumer.subscribe({ topic: vaccinationTopic, fromBeginning: true })
  }
  if (assignedTopic.includes(declarationTopic)) {
    await consumer.subscribe({ topic: declarationTopic, fromBeginning: true })
  }
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === vaccinationTopic) {
        if ((!assignedPartition && assignedPartition !== 0) || assignedPartition == partition) {
          await insertVaccination(JSON.parse(message.value)).catch(err => {
            console.error('Error while inserting vaccination', err)
          })
        }
      }
      if (topic === declarationTopic) {
        if ((!assignedPartition && assignedPartition !== 0) || assignedPartition == partition) {
          await insertDeclaration(JSON.parse(message.value)).catch(err => {
            console.error('Error while inserting declaration', err)
          })
        }
      }
    }
  })
}

const startMessageConsuming = async () => {
  consume().catch(async err => {
    console.error('Error while starting consuming message: ', err)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to disconnect consumer', e)
    }
  })
}

module.exports = {
  startMessageConsuming
}