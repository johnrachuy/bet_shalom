myApp.controller('PasswordController', ['$scope', 'PassportFactory', '$location', '$routeParams', function($scope, PassportFactory, $location, $routeParams) {

    $scope.passportFactory = PassportFactory;
    $scope.token = $routeParams.token;

    $scope.passportFactory.factoryVerifyToken($scope.token).then(function () {
        $scope.username = $scope.passportFactory.factoryUserEmail();
    });

    $scope.updatePassword = function() {
        var newPassword = {
            username: $scope.username,
            password: $scope.password
        };
        $scope.passportFactory.factorySetPassword(newPassword).then(function () {
            $scope.username = null;
            $scope.password = null;
            $scope.password1 = null;
            $location.path('/home');
        });
    };

    //console.log('Password Controller');
}]);