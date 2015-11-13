'use strict';

angular.module('li211App.controllers')
.controller('loginController', [function () {
	this.login = 1;
    this.register = 0;
    this.forgot = 0;

   angular.element('body').removeClass('sw-toggled');
}]);