var app = angular.module('btca', ['ngRoute']);

app.config(function($routeProvider, $locationProvider, $compileProvider){

	// need to add this so angular does not add 'unsafe' to the download url for the backup
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|blob):/);

    $routeProvider

    .when('/login', {
    	templateUrl: 'views/login.html',
    	controller: 'LoginController'
    })

    .when('/main', {
    	templateUrl: 'views/main.html',
    	controller: 'MainController'
    })

    .when('/', {
    	templateUrl: 'views/login.html',
    	controller: 'LoginController'
    })

    .otherwise({redirectTo: '/login'});
});