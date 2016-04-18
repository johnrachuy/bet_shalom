myApp.controller('PasswordController', ['$scope', 'PassportFactory', '$location', '$route', '$routeParams', '$http', function($scope, PassportFactory, $location, $route, $routeParams, $http) {

    $scope.passportFactory = PassportFactory;
    $scope. token = $routeParams.token;

    $http.get('/email/' + $scope.token).then(function(response) {
        $scope.username = response.data[0].username;
    });

    $scope.updatePassword = function() {
        var newPassword = {
            username: $scope.username,
            password: $scope.password
        };
        $http.put('/register', newPassword).then(function(response) {
            $scope.username = null;
            $scope.password = null;
            $scope.password1 = null;
            $location.path('/home');
        });
    };


    console.log('Password Controller');
}]);