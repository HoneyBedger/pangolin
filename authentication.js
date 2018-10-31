//===DEPENDENCIES===//
const jwt = require('jsonwebtoken');
//=================//


//===JWT AUTHENTICATION===//
exports.verifyUser = (socket, next) => {
  console.log("in verify User socket is", socket.handshake.query);
  next();
}

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: 60*60*10});
};

//=================//
