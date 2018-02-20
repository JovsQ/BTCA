var app = angular.module('btca', ['ngRoute', 'ui.bootstrap']);

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

app.component('viewImageComponent', {
  templateUrl: 'views/modal_image.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function(databaseService, $scope) {
    var $ctrl = this;
    $scope.positionLevels = [];

    $ctrl.$onInit = function(){
        $ctrl.front = $ctrl.resolve.front;
        $ctrl.back = $ctrl.resolve.back;
    };

    $ctrl.ok = function(value){
        $ctrl.close();
    };

    $ctrl.cancel = function(){
       $ctrl.close();
    };
  }
});