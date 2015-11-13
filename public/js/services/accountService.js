'use strict';

angular.module('li211App.services')
.factory('accountService', function ($http) {
	return {
		getInfos: function(){
			return $http({
				method: 'GET',
				url: '/api/account/infos'
			});
		},
		isAuthenticated: function() {
			return new Promise(function(resolve, reject) {
				$http({
					method: 'GET',
					url: '/api/account/isauthenticated'
				}).then(function(response) {
					if (response.data.success && response.data.isAuthenticated) {
						resolve();
					}
					else {
						reject();
					}
				}).catch(function(err) {
					reject();
				})
			});
		}
	};
});