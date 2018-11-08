//===DEPENDENCIES===//
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
//=================//

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: new mongoose.Schema({
    data: String,
    type: String
  }), //base64 encoded
  contacts: [{type: Schema.Types.ObjectId, ref: 'User'}],
  newContacts: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

//automatically add username and password with hashing and salt
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
