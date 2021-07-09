const mongodb = require('mongodb')
const getDB = require('../util/database').getDb

const ObjectId = mongodb.ObjectID

class User {
  constructor(username, email){
    this.name = username;
    this.email = email
  }

  save(){
    const db = getDB();
    return db.collection('users')
    .insertOne(this)
    .then( result => {
      console.log(result)
    })
    .catch( err => {
      console.log(err)
    })
  }

  static findById(userId){
    const db = getDB()
    return db.collection('users')
    .find({_id: new ObjectId(userId)})
    .next()
    .then( user => {
      console.log('from find by id', user)
      return user
    })
    .catch( err => {
      console.log(err)
    });
  }
}

module.exports = User;