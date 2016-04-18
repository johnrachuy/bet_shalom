myApp.controller('CreateUserController', ['$scope', 'PassportFactory', '$http', '$route', '$location', '$routeParams', '$uibModal', '$log', 'DataFactory', function($scope, PassportFactory, $http, $route, $location, $routeParams, $uibModal, $log, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.passportFactory = PassportFactory;
    $scope.selectedName = null;
    $scope.users_id = null;
    $scope.getNames = [];
    $scope.viewData = [];
    //$scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    getNames();

    //validateUser to make sure the role can be on this page then get all the lessons for the teacher
    //validateUser();

    //Function to check the user and re-route them if they are not validated
    //function validateUser() {
    //    if($scope.loggedInUser.role == 'admin') {
    //
    //    } else {
    //        $location.path('/home');
    //    }
    //}

    //populating drop-down of existing users
    function getNames() {
        $scope.dataFactory.factoryGetNames().then(function () {
            $scope.getNames = $scope.dataFactory.factoryNames();
        });
    }

    //get info of selected name
    $scope.getInfo = function () {
        $scope.dataFactory.factorySelectedName($scope.selectedName).then(function () {
            $scope.viewData = $scope.dataFactory.factoryName();
            console.log($scope.viewData);
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
            password: '123',
            role: $scope.role,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            phone: $scope.phone,
            grade: $scope.grade,
            users_id: $scope.users_id
        };

        //if existing user
        if ($scope.users_id > 0) {
            console.log('existing user');
            $scope.passportFactory.factorySaveUpdatedEntry(entry).then(function () {
                clearForm();
                getNames();
            });

        //if new user
        } else {
            console.log('new user');
            $scope.passportFactory.factorySaveNewEntry(entry).then(function () {
                $scope.newUser = $scope.passportFactory.factoryNewEntry();
                    var resetInfo = {
                        username: $scope.newUser.username,
                        fk_users_id: $scope.newUser.users_id,
                        token: (Math.random() + 1).toString(36).substring(7)
                };
                    $scope.passportFactory.factoryTokenReset(resetInfo).then(function () {
                        clearForm();
                        getNames();
                    });
            });
        }
    };

    $scope.removeUser = function (size) {
        var id = {
            users_id: $scope.users_id
        };
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalRemoveUser.html',
            controller: 'ModalController',
            size: size,
            resolve: {
                myUsername: function () {
                    return $scope.username;
                },
                currentLessonPlan: function () {
                    return $scope.lesson_title;
                }
            }
        });

        modalInstance.result.then(function () {

            $scope.passportFactory.factoryRemoveUser(id).then(function () {
                clearForm();
                $route.reload();
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    console.log('Create User Controller');
}]);