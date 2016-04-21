myApp.controller('SearchController', ['$scope', 'PassportFactory', 'DataFactory', '$location', '$http', function($scope, PassportFactory, DataFactory, $location, $http) {

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;
    $scope.loggedInUser = {};

    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    //Function to check the user and re-route them if they are not validated
    validateUser();

    function validateUser() {
        if($scope.loggedInUser.role == 'admin' || $scope.loggedInUser.role == 'teacher') {

        } else {
            $location.path('/home');
        }
    }

    $scope.tags = [];
    $scope.tagAdded = function(tag) {
        $scope.searchTag(tag);
    };
    $scope.tagRemoved = function(tag) {
        $scope.viewLesson = null;
    };

    //Auto-complete function for ngTagsInput
    $scope.loadTags = function($query) {
        return $http.get('/tags', { cache: true}).then(function(response) {
            var keyTags = response.data;
            return keyTags.filter(function(tag) {
                return tag.tag_name.toLowerCase().indexOf($query.toLowerCase()) != -1;
            });
        });
    };

    //Tied to a ng-change on the first drop-down menu
    $scope.searchTag = function(tag) {
        $http.get('/tag_search/' + tag.tag_id).then(function(response) {
            $scope.viewLesson = response.data;
            $scope.selectedName = null;
        });
    };

    //Function to reroute the user to the lesson plan controller
    $scope.editClickedLesson = function(index){
        $scope.dataFactory.factoryStoredLessonId = $scope.viewLesson[index].lesson_id;
        $scope.dataFactory.factoryLessonViewState = true;
        $scope.dataFactory.factoryLessonStatus = $scope.viewLesson[index].status;
        $location.path('/lesson_plan');
    };
}]);