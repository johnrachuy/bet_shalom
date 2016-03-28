myApp.controller('LoginController', ['$scope', 'PassportFactory', '$http', '$window', '$location', function($scope, PassportFactory, $http, $window, $location) {

    $scope.passportFactory = PassportFactory;

    $scope.loginUser = function (username, password) {
        $scope.passportFactory.factoryUserSubmit(username, password)
        //console.log(username, password);
        //username = $scope.username;
        //console.log(username);

    };




    //
    //$scope.passportFactory.factoryUserAuthentication().then(function(userDatum) {
    //    $scope.userData = userDatum;
    //    $scope.userName = userDatum.username;
    //});

    console.log('Login Controller');

}]);