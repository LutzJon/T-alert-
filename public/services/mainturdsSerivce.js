angular.module('Turder').service('mainturdsService', function($http) {

	this.getTurds = function() {
		return $http({
			method: 'GET',
			url: '/api/turds'
		});
	};

});