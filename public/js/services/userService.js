'use strict';

angular.module('li211App.services')
.factory('userService', function ($http) {
	return {
		getUsers: function(){
			return $http({
				method: 'GET',
				url: '/api/users'
			});
		}
	};
});