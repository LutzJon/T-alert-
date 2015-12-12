angular.module('Turder').service('userService', function($http){

this.createUser = function(user){
	$http({
		method: "POST",
		url: 'http://localhost/8080/api/users',
		data: user
	});

},

this.getUsers = function(){
  $http({
  	method: 'GET',
  	url: 'http://localhost/8080/api/users',
  	data: user
  });
},

this.updateUser = function(ID, edit){
	$http({
		method: 'PUT',
		url: 'http://localhost/8080/api/user/'+ ID,
		data: edit
	});
},

this.getUser = function(user){
	$http({
		method: 'GET',
		url: 'http://localhost/8080/api/user/'+ user,
		data: user,
     }).then(function(user){
     	return user;
     });
},

this.removeUser = function(ID){
	$http({
		method: "DELETE",
		url: 'http://localhost/8080/api/user/'+ ID,
		data: user
	});
}

});


