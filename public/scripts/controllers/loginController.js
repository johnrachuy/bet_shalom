myApp.controller('LoginController', ['$scope', 'PassportFactory', '$http', '$window', '$location', function($scope, PassportFactory, $http, $window, $location) {

    $scope.passportFactory = PassportFactory;

    $scope.loginUser = function (username, password) {
        $scope.passportFactory.factoryUserSubmit(username, password)
    };

    $scope.forgotPass = function (username) {
        $http.get('/update_user/' + username).then(function(response) {
            var resetInfo = {
                username: $scope.username,
                fk_users_id: response.data[0].users_id,
                token: (Math.random() + 1).toString(36).substring(7)
            };
            $http.post('/email', resetInfo).then(function(response) {
            });
        })
    };

    console.log('Login Controller');

}]);