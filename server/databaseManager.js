const config = require('./config/config');
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(config.MONGO_URI, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

class DatabaseManager {

}