//===DEPENDENCIES===//
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/users');
//=================//

//===Local username/password check===//
exports.local = passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===JWT AUTHENTICATION===//
exports.verifyUser = (socket, next) => {
  let token = socket.handshake.headers['token'];
  let username = socket.handshake.headers['username'];
  if (!token || !username) {
    next(new Error('Authentication token and/or username are empty.'));
    return;
  }
  let tockenPayload;
  try {
    tockenPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(err);
    return;
  }
  console.log('in JWT verification payload is:', tockenPayload);
  if (tockenPayload.username !== username)
      next(new Error('Authentication token does not belong to user.'));
  else next(); // token appears to be valid
}

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 60*60*5});
};

//=================//
