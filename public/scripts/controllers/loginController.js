myApp.controller('LoginController', ['$scope', 'PassportFactory', '$location', function($scope, PassportFactory, $location) {

    $scope.passportFactory = PassportFactory;

    $scope.loginUser = function (username, password) {
        $scope.passportFactory.factoryUserSubmit(username, password)
    };

    $scope.go = function(path) {
        $location.path(path);
    };
}]);