myApp.controller('HomeController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.message = 'Home';

    $http.get('/user').then(function(response) {
        if(response.data) {
            $scope.userName = response.data.username;
            console.log('User Data: ', $scope.userName);
        } else {
            $window.location.href = '/index.html';
        }
    });


    console.log('Home Controller');

}]);