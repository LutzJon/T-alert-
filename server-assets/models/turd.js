var mongoose = require('mongoose');

var Turd = mongoose.model('Turd', new mongoose.Schema({
	size: {type: String, enum: ['small', 'medium', 'large', 'elephant'], index: true},
	location: String,
	date: {type: Date, default: Date.now()},
	picture: {data: Buffer, contentType: String}
}));

module.exports = mongoose.model('Turd', Turd);