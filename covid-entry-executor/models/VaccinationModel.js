const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

insertVaccination = async (vaccination) => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const vaccinationDatabase = database.collection('vaccination')

    await vaccinationDatabase.insertOne(vaccination)
    console.log('Vaccination inserted!')
  } finally {
    await client.close()
  }
}

getVaccinations = async () => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const vaccinationDatabase = database.collection('vaccination')

    return await vaccinationDatabase.find().toArray()
  } finally {
    await client.close()
  }
}

getVaccinationsByCitizenId = async (id) => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const vaccinationDatabase = database.collection('vaccination')

    const query = { Citizen_Id: id }
    return await vaccinationDatabase.find(query).toArray()
  } finally {
    await client.close()
  }
}

module.exports = {
  insertVaccination, getVaccinations, getVaccinationsByCitizenId
}