var myApp = angular.module('myApp');

myApp.controller('DevicesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('DevicesController loaded...');

	$scope.getDevices = function(){
		$http.get('/api/devices').success(function(response){
			$scope.devices = response;
		});
	}

	$scope.getDevice = function(){
		var id = $routeParams.id;
		$http.get('/api/devices/'+id).success(function(response){
			$scope.device = response;
		});
	}

	$scope.addDevice = function(){
		$http.post('/api/devices/', $scope.device).success(function(response){
			window.location.href='#/devices';
		});
	}

	$scope.updateDevice = function(){
		var id = $routeParams.id;
		$http.put('/api/devices/'+id, $scope.device).success(function(response){
			window.location.href='#/devices';
		});
	}

	$scope.removeDevice = function(id){
		$http.delete('/api/devices/'+id).success(function(response){
			window.location.href='#/devices';
		});
	}
}]);