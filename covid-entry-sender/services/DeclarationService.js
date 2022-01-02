const kafka = require('../config/kafka')

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

module.exports = {
  produce
}