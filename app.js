const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const MongoConnect = require('./util/database').MongoConnect
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
 
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   User.findById('60e88fc8bdfaa21dce586b9d')
   .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id)
      next();
   })
   .catch( err => console.log(err))
})
 
app.use('/admin', adminRoutes);

app.use(shopRoutes);
app.use(errorController.get404);

MongoConnect(() => {
   app.listen(3000)
})