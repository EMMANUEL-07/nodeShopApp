// const mongodb = require('mongodb')
// const getDB = require('../util/database').getDb

// const ObjectId = mongodb.ObjectID

// class Product {
//   constructor(title, price, description, imageUrl, userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.userId = userId
//   }

//   save(){
//     const db = getDB();
//     return db.collection('products')
//     .insertOne(this)
//     .then( result => {
//       console.log(result)
//     })
//     .catch( err => {
//       console.log(err)
//     })
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection('products')
//     .find()
//     .toArray()
//     .then( products => {
//       console.log(products)
//       return products
//     })
//     .catch( err => {
//       console.log(err)
//     });
//   }

//   static findById(prodId){
//     const db = getDB()
//     return db.collection('products')
//     .find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then( product => {
//       console.log('from find by id product', product)
//       return product
//     })
//     .catch( err => {
//       console.log(err)
//     });
//   }

//   static updateByID(prodId,updates){
//     const db = getDB()
//     return db.collection('products')
//     .updateOne( 
//       {_id: new mongodb.ObjectId(prodId)},    
//       {
//         $set: updates,
//         $currentDate: { lastModified: true }
//       }
//     )
//     .then( product => {
//       console.log('from update by id',product)
//       return product
//     })
//     .catch( err => {
//       console.log(err)
//     });
//   }

//   static deleteById(prodId){
//     const db = getDB()
//     return db.collection('products')
//     .deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then( product => {
//       console.log('from delete by id',product)
//       return product
//     })
//     .catch( err => {
//       console.log(err)
//     });
//   }
// }


// module.exports = Product;