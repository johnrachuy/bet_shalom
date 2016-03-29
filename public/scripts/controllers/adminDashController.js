myApp.controller('AdminDashController', ['$scope', 'PassportFactory', '$http', '$window', '$location', function($scope, PassportFactory, $http, $window, $location) {

    $scope.loggedInUser = {};

    $scope.passportFactory = PassportFactory;
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
    console.log($scope.loggedInUser);

    validateUser();

    function validateUser() {
        if($scope.loggedInUser.role == 'admin') {

        } else {
            $location.path('/home');
        }
    }

    console.log('Admin Dashboard Controller');
}]);