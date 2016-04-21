myApp.controller('ResetController', ['$scope', 'PassportFactory', '$location', '$route', '$routeParams', '$http', '$uibModal', function($scope, PassportFactory, $location, $route, $routeParams, $http, $uibModal) {

    $scope.passportFactory = PassportFactory;

    $scope.resetPass = function (username, size) {
        $http.get('/update_user/' + username).then(function(response) {
            var resetInfo = {
                username: $scope.username,
                fk_users_id: response.data[0].users_id,
                token: (Math.random() + 1).toString(36).substring(7)
            };
            $http.post('/email', resetInfo).then(function() {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'modalResetPassword.html',
                    controller: 'ModalController',
                    size: size,
                    resolve: {
                        myUsername: function () {
                            return $scope.username;
                        },
                        currentLessonPlan: function () {
                            return $scope.lessonPlan;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $location.path('/home');

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            });
        })
    };
}]);