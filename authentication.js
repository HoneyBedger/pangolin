//===DEPENDENCIES===//
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');
const User = require('./models/users');
//=================//

//===Local username/password check===//
exports.local = passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//===JWT AUTHENTICATION===//
// for WebSocket
exports.verifyUser = (socket, next) => {
  let token = socket.handshake.headers['token'];
  let username = socket.handshake.headers['username'];
  if (!token || !username) {
    next(new Error('Authentication token and/or username are empty.'));
    return;
  }
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(err);
    return;
  }
  if (tokenPayload.username !== username)
      next(new Error('Authentication token does not belong to user.'));
  else next(); // token appears to be valid
};

exports.tokenOK = (token) => {
  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 60*60*10});
};


// for HTTP
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

exports.jwtPassport = passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
  }, (jwtPayload, next) => {
    User.findOne({_id: jwtPayload._id})
    .then((user) => {
      if (user) {
        return next(null, user);
      } else {
        return next(null, false);
      }
    }).catch((err) => next(err));
}));

exports.verifyUserHTTP = passport.authenticate('jwt', {session: false});


//=================//
