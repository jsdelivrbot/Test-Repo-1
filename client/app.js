var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'DevicesController',
		templateUrl: 'views/devices.html'
	})
	.when('/devices', {
		controller:'DevicesController',
		templateUrl: 'views/devices.html'
	})
	.when('/devices/details/:id',{
		controller:'DevicesController',
		templateUrl: 'views/device_details.html'
	})
	.when('/devices/add',{
		controller:'DevicesController',
		templateUrl: 'views/add_device.html'
	})
	.when('/devices/edit/:id',{
		controller:'DevicesController',
		templateUrl: 'views/edit_device.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});