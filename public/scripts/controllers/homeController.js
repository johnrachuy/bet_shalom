myApp.controller('HomeController', ['$scope', 'PassportFactory', '$http', '$window', function($scope, PassportFactory, $http, $window) {
    $scope.message = 'Home';

    $scope.passportFactory = PassportFactory;

    $scope.passportFactory.factoryUserAuthentication().then(function(userDatum) {
        $scope.userData = userDatum;
        $scope.userName = userDatum.username;
    });

    //$http.get('/user').then(function(response) {
    //    if(response.data) {
    //        $scope.userName = response.data.username;
    //        console.log('User Data: ', $scope.userName);
    //    } else {
    //        $window.location.href = '/index.html';
    //    }
    //});


    console.log('Home Controller');

}]);