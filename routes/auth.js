const express = require('express');
const { check, body } = require('express-validator/check')

const authController = require('../controllers/auth');

const router = express.Router();

const User = require('../models/user');



router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
   '/login',
   [
      check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),

   
      body('password', 'password should be valid')
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim()
   ],
   authController.postLogin);

router.post(
   '/signup',
   [
      check('email')
         .isEmail()
         .withMessage('Please enter a valid email')
         .custom((value, { req }) => {
            // if(value === 'test@test.com'){
            //    throw new Error('This email is forbidden')
            // }
            // return true;

            return User.findOne({ email: value })
               .then(userDoc => {
                  if (userDoc) {
                     return Promise.reject('Email already exists, please use a different one')
                  }
               })
         })
         .normalizeEmail(),
      body('password', 'password should be atleast 6 chars long and alphanumeric')
         .isLength({ min: 6 })
         .isAlphanumeric()
         .trim(),

      body('confirmPassword')
         .trim()
         .custom((value, { req }) => {
            if (value !== req.body.password) {
               throw new Error('Passwords have to match')
            }
            return true;
         })


   ],

   authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);



module.exports = router;