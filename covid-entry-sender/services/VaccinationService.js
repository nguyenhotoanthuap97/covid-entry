const kafka = require('../config/kafka')
const VaccinationModel = require('../models/VaccinationModel')

const topic = `covid-vaccination`
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
    console.log(`Vaccination message for ${message.Citizen_Id} sent!`)
    return true
  } catch (err) {
    console.error("could not send message " + err);
  }
  return false
};

const getAllVaccinations = async () => {
  return VaccinationModel.getVaccinations()
}

const getVaccinationsByCitizenId = async (id) => {
  return VaccinationModel.getVaccinationsByCitizenId(id)
}

module.exports = {
  produce, getAllVaccinations, getVaccinationsByCitizenId
}