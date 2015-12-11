var Turd = require('../models/turd.js');

module.exports = {
	addTurd = function(req, res) {
		var turd = new Turd(req.body);
		turd
			.save(function(err, results) {
				if(!err) {
					res.status(201).send(results);
				} else {
					res.status(500).send(err);
				}
			});
	}
}