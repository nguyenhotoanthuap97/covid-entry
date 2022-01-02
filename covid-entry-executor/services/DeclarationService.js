const kafka = require('../config/kafka')
const { insertDeclaration } = require('../models/DeclarationModel')

const topic = 'declaration'

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic })
  await consumer.run({
    eachMessage: async ({ message }) => {
      await insertDeclaration(JSON.parse(message.value)).catch(err => {
        console.error('Error while inserting declaration', err)
      })
    }
  })
}

const startDeclarationMessageConsuming = async () => {
  consume().catch(async err => {
    console.error('Error while starting consuming declaration message: ', err)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to disconnect declaration consumer', e)
    }
  })
}

module.exports = {
  startDeclarationMessageConsuming
}