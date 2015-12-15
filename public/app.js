angular.module('Turder', ['ui.router'])
  .config($httpProvider, $stateProvider, $urlRouterProvider) {
  	$urlRouterProvider.otherwise('/mainturds');
  	$stateProvider
  		.state('/mainturds', {
  			url: '/mainturds',
  			templateUrl: 'templates/mainturds.html',
  			controller: 'mainturdsCtrl'
  		})

  }