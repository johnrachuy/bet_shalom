myApp.controller('ResetController', ['$scope', 'PassportFactory', '$location', '$route', '$routeParams', '$http', function($scope, PassportFactory, $location, $route, $routeParams, $http) {

    $scope.passportFactory = PassportFactory;

    $scope.resetPass = function (username) {
        $http.get('/update_user/' + username).then(function(response) {
            var resetInfo = {
                username: $scope.username,
                fk_users_id: response.data[0].users_id,
                token: (Math.random() + 1).toString(36).substring(7)
            };
            $http.post('/email', resetInfo).then(function() {
                $location.path('/home');
            });
        })
    };

    console.log('Password Controller');
}]);