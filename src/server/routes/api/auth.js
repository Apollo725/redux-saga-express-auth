const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const withAuth = require('../../middleware');

const router = express.Router();
const secret = 'mysecretsshhh';

router.post('/register', (req, res) => {
  // const { name, email, password } = req.body;
  // const user = new User({ name, email, password });
  console.log('backend register API', req.body);
  // user.save((err) => {
  //   if (err) {
  //     res.status(500)
  //       .send({ message: 'Error registering new user please try again!' });
  //   } else {
  //     res.status(200).send({ message: 'Registered Successfully!' });
  //   }
  // });

  User.findOne({
    email: req.body.email
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email aleady exists!'
      });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error('There was an error', err);
      else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error('There was an error', err);
          else {
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json(user);
              });
          }
        });
      }
    });
    // bcrypt.genSalt(10, (err, salt) => {
    //   if (err) console.log('There was an error', err);
    //   console.log('backend salt', salt);
    //   return null;
    //   else {
    //     bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
    //       if (err) console.log('There was an error', err);
    //       else {
    //         newUser.password = hashedPassword;
    //         newUser
    //           .save()
    //           .then((user) => {
    //             res.json(user);
    //           });
    //       }
    //     });
    //   }
    // });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal eror please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: 120
          });
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      });
    }
  });
});

router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
