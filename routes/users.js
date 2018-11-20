//===DEPENDENCIES===//
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authentication = require('../authentication');
const User = require('../models/users');
const clientManager = require('../socket/clientManager');
//=================//

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//===QUERY USERS===//
userRouter.get('/', authentication.verifyUserHTTP, (req, res, next) => {
  if (req.query.search) {
    User.find({$text: {$search: req.query.search}}, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .select('username name picture')
    .lean()
    .then(users => {
      for (let user of users) {
        if (clientManager.getClient(String(user._id)))
          user.online = true;
      }
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).send('Error quering users.'));
  } else {
    User.find(req.query)
    .select('username name picture')
    .lean()
    .then(users => {
      for (let user of users) {
        if (clientManager.getClient(String(user._id)))
          user.online = true;
      }
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).send('Error quering users.'));
  }
});



//===REGISTER===//
userRouter.post('/register', (req, res, next) => {
  User.register(new User({ username: req.body.username, name: req.body.name }),
    req.body.password)
  .then(user => {
    user.save()
    .then(userObj => {
      let token = authentication.getToken({
        _id: userObj._id,
        username: userObj.username
      });
      let { username, name } = userObj;
      let user = { username, name, token };
      return res.status(200).json({err: null, user});
    })
    .catch(err => res.status(500).json({err: err.message, user: null}));
  })
  .catch(err => res.status(500).json({err: err.message, user: null}));
});
//=================//


//===LOGIN===//
userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
  if (!req.user)
    res.status(401).json({ err: 'Passport authenticate did not return a user.', user: null });
  let token = authentication.getToken({
    _id: req.user._id,
    username: req.user.username
  });
  let { username, name } = req.user;
  let user = { username, name, token};
  res.status(200).json({err: null, user});
});
//=================//


module.exports = userRouter;
