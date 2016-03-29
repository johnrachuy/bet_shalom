myApp.controller('CreateUserController', ['$scope', 'PassportFactory', '$http', '$window', function($scope, PassportFactory, $http, $window) {

    $scope.passportFactory = PassportFactory;

    $scope.saveUser = function () {

        var entry = {
            username: $scope.username,
            password: $scope.password,
            role: $scope.role,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            phone: $scope.phone,
            grade: $scope.grade
        };

        $scope.passportFactory.factorySaveEntry(entry);
    };

    console.log('Create User Controller');
}]);