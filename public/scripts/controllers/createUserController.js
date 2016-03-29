myApp.controller('CreateUserController', ['$scope', 'PassportFactory', '$http', '$window', function($scope, PassportFactory, $http, $window) {

    $scope.passportFactory = PassportFactory;
    $scope.selectedName = null;
    $scope.users_id = null;
    $scope.getNames = [];

    //populating drop-down of existing users
    $http.get('/get_names').then(function(response) {
       $scope.getNames = response.data;
    });

    //get info of selected name
    $scope.getInfo = function () {
        $http.get('/get_info/' + $scope.selectedName).then(function(response) {
            $scope.viewData = response.data;

            $scope.username = $scope.viewData[0].username;
            $scope.first_name = $scope.viewData[0].first_name;
            $scope.last_name = $scope.viewData[0].last_name;
            $scope.role = $scope.viewData[0].role;
            $scope.phone = $scope.viewData[0].phone;
            $scope.grade = $scope.viewData[0].grade;
            $scope.users_id = $scope.viewData[0].users_id;

        });
    };

    //clears form
    function clearForm () {
        $scope.username = null;
        $scope.password = null;
        $scope.first_name = null;
        $scope.last_name = null;
        $scope.role = null;
        $scope.phone = null;
        $scope.grade = null;
        $scope.users_id = null;
    }

    //captures data off form
    $scope.saveUser = function () {
        var entry = {
            username: $scope.username,
            password: $scope.password,
            role: $scope.role,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            phone: $scope.phone,
            grade: $scope.grade,
            users_id: $scope.users_id
        };

        //if existing user
        if ($scope.users_id > 0) {
            console.log('existing user')
            $scope.passportFactory.factorySaveUpdatedEntry(entry);
            clearForm();

        //if new user
        } else {
            console.log('new user')
            $scope.passportFactory.factorySaveNewEntry(entry);
            clearForm();
        }

        $scope.selectedName = null;
    };

    console.log('Create User Controller');
}]);