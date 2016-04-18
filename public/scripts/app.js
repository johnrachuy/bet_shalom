var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngTagsInput']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/admin_dash', {
            templateUrl: '/views/templates/admin_dash.html',
            controller: 'AdminDashController'
        })
        .when('/teacher_dash', {
            templateUrl: '/views/templates/teacher_dash.html',
            controller: 'TeacherDashController'
        })
        .when('/search', {
            templateUrl: '/views/templates/search.html',
            controller: 'SearchController'
        })
        .when('/lesson_plan', {
            templateUrl: '/views/templates/lesson_plan.html',
            controller: 'LessonPlanController'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'CreateUserController'
        })
        .when('/password/:token', {
            templateUrl: '/views/templates/password.html',
            controller: 'PasswordController'
        })
        .when('/reset', {
            templateUrl: '/views/templates/reset.html',
            controller: 'ResetController'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);
