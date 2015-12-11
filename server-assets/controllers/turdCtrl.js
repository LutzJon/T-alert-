var Turd = require('../models/turd.js');

module.exports = {
  addTurd: function(req, res) {
	var turd = new Turd(req.body);
	 turd
      .save(function(err, results) {
		if(!err) {
		  res.status(201).send(results);
		}else {
		  res.status(500).send(err);
				}
		   });
	},

	getTurds: function(req, res) {
		Turd
		 .find()
		 .exec()
		 .then(function(turds){
		 	console.log('Turds from getTurds: ' + turds);
             res.status(200).send(turds);
		 });
	},
	getTurd: function(req, res){
	   	Turd
	   	.find({_id: req.params.id})
	   	.exec()
	   	.then(function(turd){
	   		if(!turd.length){
	   			res.status(404).end()
	   		} else {
	   			res.status(200).send(turd)
	   		}
	   	})
	   },
};