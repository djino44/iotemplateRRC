'use strict';

/* Directives */
angular.module('li211App.directives', []);

angular.module('li211App.directives')
.directive('appVersion', function (version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
})