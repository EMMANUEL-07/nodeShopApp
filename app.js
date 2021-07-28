const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')

const errorController = require('./controllers/error');
// const MongoConnect = require('./util/database').MongoConnect
const password = require('./keys').password
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false}))



app.use((req, res, next) => {
   User.findById('60fb780c5eb7e921c4c11a3d')
      .then(user => {
         req.user = user
         next();
      })
      .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(`mongodb+srv://Emmanuel:${password}@emmanuellearn.2fofu.mongodb.net/shop?retryWrites=true&w=majority`)
   .then(result => {
      User.findOne().then(user => {
         if (!user) {
            const user = new User({
               name: 'Emmanuel',
               email: 'emmanueloyekan33@gmail.com',
               cart: {
                  items: []
               }
            })

            user.save()
         }
      })

      app.listen(3000)
   })
   .catch(err => console.log(err))