var mongoose = require('mongoose');


var User = mongoose.model('User', new mongoose.Schema({
  userName: {type: String, required: true}, 
  password: {type: String, required: true},
  email: String,
  joinedDate: {type: Date, default: Date.now()},
  avatar: {data: Buffer, contentType: String},
  stinkLevel: Number
}));








module.exports = mongoose.model('User', User);