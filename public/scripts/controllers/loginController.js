myApp.controller('LoginController', ['$scope', 'PassportFactory', '$http', '$window', '$location', function($scope, PassportFactory, $http, $window, $location) {

    $scope.passportFactory = PassportFactory;

    $scope.loginUser = function (username, password) {
        $scope.passportFactory.factoryUserSubmit(username, password)
    };

    $scope.go = function(path) {
        $location.path(path);
    };
}]);