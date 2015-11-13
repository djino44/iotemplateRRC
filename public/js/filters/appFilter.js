'use strict';

/* Filters */
angular.module('li211App.filters', [])

angular.module('li211App.filters')
.filter('interpolate', function (version) {
	return function (text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
});
