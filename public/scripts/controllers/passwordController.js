myApp.controller('PasswordController', ['$scope', 'PassportFactory', '$location', '$routeParams', '$uibModal', '$log', function($scope, PassportFactory, $location, $routeParams, $uibModal, $log) {

    $scope.passportFactory = PassportFactory;
    $scope.token = $routeParams.token;

    $scope.passportFactory.factoryVerifyToken($scope.token).then(function () {
        $scope.username = $scope.passportFactory.factoryUserEmail();
    });

    $scope.updatePassword = function(size) {
        if ($scope.password == $scope.password1) {
            var newPassword = {
                username: $scope.username,
                password: $scope.password
            };
            $scope.passportFactory.factorySetPassword(newPassword).then(function () {
                $scope.username = null;
                $scope.password = null;
                $scope.password1 = null;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modalPasswordUpdated.html',
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
                    $location.path('/home');
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            });
        } else {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modalPasswordMatch.html',
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

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

    };
}]);