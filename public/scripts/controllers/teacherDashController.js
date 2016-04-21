myApp.controller('TeacherDashController', ['$scope', 'PassportFactory', 'DataFactory', '$http', '$window', '$location',
    function($scope, PassportFactory, DataFactory, $http, $window, $location) {

    //Creates an object to store the info of a logged-in user
    $scope.loggedInUser = {};
    //Creates an array to store the list of lesson plans from the database
    $scope.lessonPlans;

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    //validateUser to make sure the role can be on this page then get all the lessons for the teacher
    validateUser();

    //Function to check the user and re-route them if they are not validated
    function validateUser() {
        if($scope.loggedInUser.role == 'teacher') {
            getLessonPlans();
            getFavorites();

        } else {
            $location.path('/home');
        }
    }

    //Function to get all the lesson plans for this teacher
    function getLessonPlans () {
        $scope.dataFactory.factoryTeacherRetrieveLessonPlans($scope.loggedInUser.users_id).then(function () {
            $scope.lessonPlans = $scope.dataFactory.factoryLessonPlans();
        });
    }

        //Function to get favorite lesson plans for this teacher
        function getFavorites() {
            $scope.dataFactory.factoryGetFavorites($scope.loggedInUser.users_id).then(function (response) {
                $scope.favoritePlans = $scope.dataFactory.factoryGetFavoritePlans();
            });
        }

    //Function to reroute the user to the lesson plan controller
        $scope.editClickedLesson = function(index){
            $scope.dataFactory.factoryStoredLessonId = $scope.lessonPlans[index].lesson_id;
            $scope.dataFactory.factoryLessonViewState = true;
            $scope.dataFactory.factoryLessonStatus = $scope.lessonPlans[index].status;
            $location.path('/lesson_plan');
        };

        //Function to reroute the user to the lesson plan controller
        $scope.editClickedFav = function(index){
            $scope.dataFactory.factoryStoredLessonId = $scope.favoritePlans[index].lesson_id;
            $scope.dataFactory.factoryLessonViewState = true;
            $scope.dataFactory.factoryLessonStatus = $scope.favoritePlans[index].status;
            $location.path('/lesson_plan');
        };
}]);