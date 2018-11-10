//===DEPENDENCIES===//
const mongoose = require('mongoose');
//=================//

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });


const ChatSchema = new Schema({
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  messages: [MessageSchema]
});


module.exports = mongoose.model('Chat', ChatSchema);
