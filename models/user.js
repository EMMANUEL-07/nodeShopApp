const mongodb = require('mongodb')
const getDB = require('../util/database').getDb

const ObjectId = mongodb.ObjectID

class User {
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email
    this.cart = cart
    this._id = id
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

  addToCart(product){
    // const cartProduct = this.cart.items.findIndex( cp => {
    //   return cp._id === product._id
    // })
     
    const updatedCart = { items: [{...product, quantity: 1}]} 


    const db = getDB();
    return db.collection('users')
    .updateOne(
      {_id: new ObjectId(this._id)}, 
      {$set: {cart: updatedCart}}
    )
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