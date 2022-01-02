const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

getDeclarations = async () => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const declarations = database.collection('declaration')

    return await declarations.find().toArray()
  } finally {
    await client.close()
  }
}

getDeclarationsByCitizenId = async (id) => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const declarations = database.collection('declaration')
    const query = { Citizen_Id: id }
    return await declarations.find(query).toArray()
  } finally {
    await client.close()
  }
}

module.exports = {
  getDeclarations, getDeclarationsByCitizenId
}