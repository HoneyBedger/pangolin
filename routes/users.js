const express = require('express');
const bodyParser = require('body-parser');
passport = require('passport');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//===REGISTER===//
userRouter.post('/register', (req, res, next) => {
  console.log("registering a user", req);
  User.register(new User({ username: req.body.username, name: req.body.name }),
    req.body.password)
  .then(user => {
    user.save()
    .then(user => {
      let { username, name, picture, contacts } = user;
      let result = { username, name, picture, contacts };
      console.log("registered a user: ", result);
      return res.status(200).json({err: null, result});
    })
    .catch(err => res.status(500).json({err: err.message, result: null}));
  })
  .catch(err => res.status(500).json({err: err.message, result: null}));
});
//=================//


//===LOGIN===//
userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log("logging in");
  if (!req.user) res.status(401).json({err: 'Passport authenticate did not return a user.', result: null});
  let token = authentication.getToken({_id: req.user._id});
  console.log("user", req.user);
  let { username, name, picture, contacts } = req.user;
  let result = { username, name, picture, contacts, token};
  console.log("authenticated as user", user);
  res.status(200).json({err: null, result});
});
//=================//

module.exports = userRouter;
