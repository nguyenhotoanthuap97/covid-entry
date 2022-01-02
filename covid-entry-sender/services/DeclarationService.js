const kafka = require('../config/kafka')
const DeclarationModel = require('../models/DeclarationModel')

const topic = `covid-declaration`
const producer = kafka.producer()

const produce = async (message) => {
  await producer.connect();
  try {
    await producer.send({
      topic,
      messages: [
        {
          key: String(new Date()),
          value: JSON.stringify(message),
        },
      ],
    });
    console.log(`Declaration message for ${message.Citizen_Id} sent!`)
    return true
  } catch (err) {
    console.error("could not send message " + err);
  }
  return false
};

const getAllDeclarations = async () => {
  return DeclarationModel.getDeclarations()
}

const getDeclarationsByCitizenId = async (id) => {
  return DeclarationModel.getDeclarationsByCitizenId(id)
}

module.exports = {
  produce, getAllDeclarations, getDeclarationsByCitizenId
}