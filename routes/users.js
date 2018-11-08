const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const authentication = require('../authentication');
const User = require('../models/users');
const clientManager = require('../socket/clientManager');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//===GET USERS===//
userRouter.get('/', authentication.verifyUserHTTP, (req, res, next) => {
  console.log('fetching users');
  const removeSensitiveInfo = (users) => {
    return users.map(user => ({
      username: user.username,
      name: user.name,
      picture: user.picture
    }));
  };

  if (req.query.search) {
    User.find({$text: {$search: req.query.search}}, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .select('username name picture')
    .lean()
    .then(users => {
      for (let user of users) {
        if (clientManager.getClient(user.username)){
          console.log(user.username, ' is online');
          user.online = true;
        }
      }
      console.log('found users', users);
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).send('Error quering users.'));
  } else {
    User.find(req.query)
    .select('username name picture')
    .lean()
    .then(users => {
      for (let user of users) {
        if (clientManager.getClient(user.username))
          user.online = true;
      }
      res.status(200).json(users);
    })
    .catch((err) => res.status(500).send('Error quering users.'));
  }
});

//===REGISTER===//
userRouter.post('/register', (req, res, next) => {
  console.log("registering a user");
  User.register(new User({ username: req.body.username, name: req.body.name }),
    req.body.password)
  .then(user => {
    console.log('saving user');
    user.save()
    .then(userObj => {
      let token = authentication.getToken({
        _id: userObj._id,
        username: userObj.username
      });
      let { username, name } = userObj;
      let user = { username, name, token };
      console.log("registered a user: ", user);
      return res.status(200).json({err: null, user});
    })
    .catch(err => {
      console.log('caught an error');
      res.status(500).json({err: err.message, user: null})
    });
  })
  .catch(err => {
    console.log('caught an error up');
    res.status(500).json({err: err.message, user: null});
  });
});
//=================//


//===LOGIN===//
userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log("logging in");
  if (!req.user)
    res.status(401).json({ err: 'Passport authenticate did not return a user.', user: null });
  let token = authentication.getToken({
    _id: req.user._id,
    username: req.user.username
  });
  console.log("user", req.user);
  let { username, name } = req.user;
  let user = { username, name, token};
  console.log("authenticated as user", user);
  res.status(200).json({err: null, user});
});
//=================//

module.exports = userRouter;
