var User = require('../models/user.js');

module.exports = {
  addUser: function(req,res){
	var user = new User(req.body);
	 user
	 .save(function(err, results){
        if(!err){
        	res.status(201).send(results);
        } else {
        	res.status(500).send(err);
        }
	 });
	},
   getUsers: function(req, res) {
	User
	 .find()
	 .exec()
	 .then(function(users){
	 	res.status(200).send(users);
	 });
	},
	getUser: function(req, res){
	   	User
	   	.find({_id: req.params.id})
	   	.exec()
	   	.then(function(user){
	   		if(!turd.length){
	   			res.status(404).end();
	   		} else {
	   			res.status(200).send(user);
	   		}
	   	});
	   },

	   patchUser: function(req, res){
	   	User
	   	 .update({_id: req.params.id}, req.body, function(err, results){
	   		if(err){
	   			res.status(500).send(err);
	   		}else{
	   			res.status(200).send(results);
	   		}
	   	});
	   },


	 removeUser: function(req, res){
	 	User 
	 	 .remove({_id: req.params.id}, function(err, results){

             if(!err){
             	res.status(204).end();
             } else{ 
             	res.status(500).send(err);
             }
	 	 });

	 	 
	 }




};
