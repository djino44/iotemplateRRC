'use strict';

angular.module('li211App.controllers')
.controller('directoryController', ['userService', 'users', function (userService, users) {

	self = this;

	self.users = [];

	self.loadUsers = function() {
		if (users.data.success) {
			self.users = users.data.users;
		}
	};

	self.loadUsers();
}]);