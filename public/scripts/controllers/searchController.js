myApp.controller('SearchController', ['$scope', 'PassportFactory', 'DataFactory', '$location', '$http', function($scope, PassportFactory, DataFactory, $location, $http) {

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;
    $scope.loggedInUser = {};

    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    //Function to check the user and re-route them if they are not validated
    validateUser();

    function validateUser() {
        if($scope.loggedInUser.role == 'admin' || 'teacher') {

        } else {
            $location.path('/home');
        }
    }

    //Populates the drop-down menus
    $http.get('/tags').then(function(response) {
        $scope.keyTags = response.data;
    });

    //Tied to a ng-change on the first drop-down menu
    $scope.searchTag = function() {
        $http.get('/tag_search/'+ $scope.selectedTag).then(function(response) {
            $scope.viewLesson = response.data;
            console.log($scope.viewLesson);
            $scope.selectedName = null;
        });
    };

    //Function to reroute the user to the lesson plan controller
    $scope.editClickedLesson = function(index){
        $scope.dataFactory.factoryStoredLessonId = $scope.viewLesson[index].lesson_id;
        //$scope.dataFactory.factoryStoredLessonId = id.lesson_id;
        $scope.dataFactory.factoryLessonViewState = true;
        $location.path('/lesson_plan');
    };

    console.log('Search Controller');
}]);