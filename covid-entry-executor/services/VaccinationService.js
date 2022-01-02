const kafka = require('../config/kafka')

const topic = 'test'

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID })

const consume = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: ({ message }) => {
      console.log('Received message: ' + message.key + ' ' + message.value)
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