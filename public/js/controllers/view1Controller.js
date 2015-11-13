'use strict';

angular.module('li211App.controllers')
	.controller('view1Controller', ['$scope', '$rootScope', 'articleService', '$firebaseObject', '$websocket', function($scope, $rootScope, articleService, $firebaseObject, $websocket) {

		$scope.value = {};
		// var ws = $websocket.$new('ws://localhost:7778/ws'); // instance of ngWebsocket, handled by $websocket service
		var ws = $websocket.$new({
			url: 'ws://localhost:7778/ws',
			reconnect: true // it will reconnect after 2 seconds
		});
		ws.$on('$open', function() {
				console.log('Oh my gosh, websocket is really open! Fukken awesome!');
			})
			.$on('$message', function(message) {
				$scope.value.v1 = message;
				$rootScope.$apply();
			});

		/************* Chart **************/

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function(points, evt) {
			console.log(points, evt);
		};

		/******* FireBase *******/
		var ref = new Firebase("https://intense-torch-9628.firebaseio.com");
		var syncObject = $firebaseObject(ref);
		syncObject.$bindTo($scope, "data");

		console.log("--------", syncObject);

	}]);