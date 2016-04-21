myApp.controller('NavController', ['$scope', 'PassportFactory', '$route', function($scope, PassportFactory, $route) {

    $scope.passportFactory = PassportFactory;

    //True/false variables that are tied to what's shown on the page based on the logged-in user
    $scope.teacherEditState = false;
    $scope.adminEditState = false;
    $scope.loggedIn = false;

    //store the logged-in user
    $scope.loggedInUser = {};

    //Gets the information from the factory about who is logged in and calls
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    $scope.$watch(function (scope) {return scope.passportFactory.factoryLoggedInUser()},
        function (newValue, oldValue) {
            $scope.loggedInUser = newValue;
            validateUser();
        }
    );

    function validateUser() {
        if($scope.loggedInUser.role == 'admin') {
            $scope.adminEditState = true;
            $scope.loggedIn = true;

        } else if ($scope.loggedInUser.role == 'teacher') {
            $scope.teacherEditState = true;
            $scope.loggedIn = true;
        } else {
            $scope.teacherEditState = false;
            $scope.adminEditState = false;
            $scope.loggedIn = false;
        }
    }

    $scope.reloadRoute = function() {
        $route.reload();
    };

    $scope.logout = function() {
        $scope.passportFactory.factoryLogoutUser().then(function () {
            validateUser();
        });
    }
}]);