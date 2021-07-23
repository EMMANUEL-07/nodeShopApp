const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const password = require('../keys').password

let _db;

const MongoConnect = (callback) => {
   MongoClient.connect(`mongodb+srv://Emmanuel:${password}@emmanuellearn.2fofu.mongodb.net/shop?retryWrites=true&w=majority`)
   .then(client => {
      console.log('connected')
      _db = client.db()
      callback()
   })
   .catch(err => {
      console.log(err)
      throw err
   })
}


const getDb = () => {
   if (_db) {
      return _db;
   }

   throw 'No database found'
}

module.exports = {
   MongoConnect,
   getDb
}