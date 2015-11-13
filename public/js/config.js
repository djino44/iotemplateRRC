angular.module('li211App').config(function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = false;

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get("$state");
        $state.go('main.home');
    });

    $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'partials/login',
        controller: 'loginController as login'
    })

    .state('main', {
        templateUrl: 'partials/common',
        controller: 'mainController as main',
        abstract: true
    })

    .state('main.home', {
        url: '/home',
        templateUrl: 'partials/home',
        controller: 'homeController as view'
    })

    .state('main.view1', {
        url: '/view1',
        templateUrl: 'partials/view1',
        controller: 'view1Controller as view'
    })

    .state('main.view2', {
        url: '/view2',
        templateUrl: 'partials/view2',
        controller: 'view2Controller as view'
    })

    .state('main.chat', {
        url: '/chat',
        templateUrl: 'partials/chat',
        controller: 'chatController as view'
    })

    .state('main.profile', {
        url: '/profile',
        templateUrl: 'partials/profile',
        controller: 'profileController as view'
    })

    .state('main.directory', {
        url: '/directory',
        templateUrl: 'partials/directory',
        controller: 'directoryController as view',
        resolve: {
            users: function(userService) {
                return userService.getUsers();
            }
        }
    });
});

angular.module('li211App').run(function($rootScope) {
    $rootScope.controllerClass = "";
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.state = toState.name;
    });
});

angular.module('li211App')
    .run(function(Permission, accountService) {
        Permission
        // Define user role calling back-end
            .defineRole('user', function(stateParams, userService) {
            // This time we will return a promise
            // If the promise *resolves* then the user has the role, if it *rejects* (you guessed it)

            // Let's assume this returns a promise that resolves or rejects if session is active
            return accountService.isAuthenticated();
        })
    });