myApp.controller('TeacherDashController', ['$scope', 'PassportFactory', '$http', '$window', '$location', function($scope, PassportFactory, $http, $window, $location) {

    $scope.loggedInUser = {};

    $scope.passportFactory = PassportFactory;
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    validateUser();

    function validateUser() {
        if($scope.loggedInUser.role == 'teacher') {

        } else {
            $location.path('/home');
        }
    }

    console.log('Teacher Dashboard Controller');
}]);