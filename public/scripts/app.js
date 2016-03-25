var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/failure', {
            templateUrl: '/views/templates/failure.html',
            controller: 'HomeController'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: 'home'
        });


}]);