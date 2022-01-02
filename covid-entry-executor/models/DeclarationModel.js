const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@covid-dashboard.xx3x5.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri)

insertDeclaration = async (declaration) => {
  try {
    await client.connect()

    const database = client.db('covid_database')
    const declarations = database.collection('declaration')
    
    await declarations.insertOne(declaration)
    console.log('Declaration inserted!')
  } finally {
    await client.close()
  }
}

module.exports = {
  insertDeclaration
}