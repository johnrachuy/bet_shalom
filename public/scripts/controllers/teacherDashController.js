myApp.controller('TeacherDashController', ['$scope', 'PassportFactory', 'DataFactory', '$http', '$window', '$location', function($scope, PassportFactory, DataFactory, $http, $window, $location) {

    $scope.loggedInUser = {};

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
    $scope.lessonPlans = undefined;

    validateUser();

    $scope.dataFactory.factoryRetrieveLessonPlans().then(function(){
        $scope.lessonPlans = $scope.dataFactory.factoryLessonPlans();
        console.log('Teacher controller' + $scope.lessonPlans);
        //populateLessons();
    });

    function validateUser() {
        if($scope.loggedInUser.role == 'teacher') {

        } else {
            $location.path('/home');
        }
    }

    console.log('Teacher Dashboard Controller');
}]);