myApp.controller('PasswordController', ['$scope', 'PassportFactory', '$location', '$routeParams', function($scope, PassportFactory, $location, $routeParams) {

    $scope.passportFactory = PassportFactory;
    $scope.token = $routeParams.token;

    $scope.passportFactory.factoryVerifyToken($scope.token).then(function () {
        $scope.username = $scope.passportFactory.factoryUserEmail();
    });

    $scope.updatePassword = function() {
        if ($scope.password == $scope.password1) {
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
        } else {
            alert('Passwords do not match!');
        }

    };

    //console.log('Password Controller');
}]);