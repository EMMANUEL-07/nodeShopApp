const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   cart: {
      items: [
         {
            productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
            quantity: { type: Number, required: true }
         }
      ]
   },
});

userSchema.methods.addToCart = function (product) {
   const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString()
   })

   let newQuantity = 1;

   const updatedCartItems = [...this.cart.items];

   if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity
   }
   else {
      updatedCartItems.push({ productId: product._id, quantity: newQuantity })
   }

   const updatedCart = { items: updatedCartItems }

   this.cart = updatedCart

   return this.save()
}

userSchema.methods.deleteItemFromCart = function (productId) {
   const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString()
   })

   this.cart.items = updatedCartItems

   return this.save()

}

userSchema.methods.clearCart = function () {
   
   this.cart.items = []

   return this.save()

}

module.exports = mongoose.model('User', userSchema)

// const mongodb = require('mongodb')
// const getDB = require('../util/database').getDb

// const ObjectId = mongodb.ObjectID

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }

//   


//   static findById(userId) {
//     const db = getDB()
//     return db.collection('users')
//     .find({ _id: new ObjectId(userId) })
//     .next()
//     .then(user => {
//       console.log('from find by id user', user)
//       return user
//     })
//     .catch(err => {
//       console.log(err)
//     });
//   }

//   deleteItemFromCart(productId){
//     

//   }

//   addOrder() {
//     
//   }



//   getOrders(){
//     const db = getDB();
//     return db.collection('orders')
//     .find({'user._id': new ObjectId(this._id)})
//     .toArray();

//   }

// }

// module.exports = User;