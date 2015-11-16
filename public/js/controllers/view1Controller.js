'use strict';

var app = angular.module('li211App.controllers');


angular.module('li211App.controllers')
	.controller('view1Controller', ['$scope', '$rootScope', 'articleService', '$firebaseObject', '$websocket', function($scope, $rootScope, articleService, $firebaseObject, $websocket) {


		// var ws = $websocket.$new('ws://localhost:7778/ws'); // instance of ngWebsocket, handled by $websocket service
		// var ws = $websocket.$new({
		// 	url: 'ws://localhost:7778/ws',
		// 	reconnect: true // it will reconnect after 2 seconds
		// });
		// ws.$on('$open', function() {
		// 		console.log('Oh my gosh, websocket is really open! Fukken awesome!');
		// 	})
		// 	.$on('$message', function(message) {
		// 		// $scope.value = message;
		// 		// console.log(message);
		// 		$rootScope.myBigData = message;
		// 		$rootScope.$apply();
		// 		// console.log(message);
		// 	});
		/************* Chart **************/

		// $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		// $scope.series = ['Series A', 'Series B'];
		// // $scope.data = [
		// // 	[65, 59, 80, 81, 56, 55, 40],
		// // 	[28, 48, 40, 19, 86, 27, 90]
		// // ];
		// // $rootScope.$apply();
		// $scope.onClick = function(points, evt) {
		// 	console.log(points, evt);
		// };

		/******* FireBase *******/
		var ref = new Firebase("https://intense-torch-9628.firebaseio.com");
		var syncObject = $firebaseObject(ref);
		syncObject.$bindTo($scope, "data");

		console.log("--------", syncObject);

	}]);


app.controller('DataTablesCtrl', function($scope, $rootScope, $websocket) {
	$scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];
	$scope.onClick = function(points, evt) {
		// $scope.randomize();
		// $scope.data = $rootScope.myBigData;
	};
	$scope.colours = [{ // grey
		fillColor: 'rgba(148,159,177,0.2)',
		strokeColor: 'rgba(148,159,177,1)',
		pointColor: 'rgba(148,159,177,1)',
		pointStrokeColor: '#fff',
		pointHighlightFill: '#fff',
		pointHighlightStroke: 'rgba(148,159,177,0.8)'
	}, { // dark grey
		fillColor: 'rgba(77,83,96,0.2)',
		strokeColor: 'rgba(77,83,96,1)',
		pointColor: 'rgba(77,83,96,1)',
		pointStrokeColor: '#fff',
		pointHighlightFill: '#fff',
		pointHighlightStroke: 'rgba(77,83,96,1)'
	}];
	$scope.randomize = function(message) {
		$scope.data = $scope.data.map(function(data) {
			var i = 0;
			return data.map(function(y) {
				console.log("length ", message.length);
				if (i < message.length) {
					y = message[i];
					i++;
				}
				return parseInt(y < 0 ? 0 : y > 100 ? 100 : y);
			});
		});
	};

	var ws = $websocket.$new({
		url: 'ws://localhost:7778/ws',
		reconnect: true // it will reconnect after 2 seconds
	});
	ws.$on('$open', function() {
			console.log('Oh my gosh, websocket is really open! Fukken awesome!');
		})
		.$on('$message', function(message) {
			console.log(message);
			$scope.randomize(message);
			$rootScope.$apply();
		});
});