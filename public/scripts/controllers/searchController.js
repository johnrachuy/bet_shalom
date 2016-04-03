myApp.controller('SearchController', ['$scope', 'PassportFactory', 'DataFactory', '$http', function($scope, PassportFactory, DataFactory, $http) {

    //Populates the drop-down menus
    $http.get('/tags').then(function(response) {
        $scope.keyTags = response.data;
    });

    //Tied to a ng-change on the first drop-down menu
    $scope.searchTag = function() {
        $http.get('/tag_search/'+ $scope.selectedTag).then(function(response) {
            $scope.viewLesson = response.data;
            $scope.selectedName = null;
        });
    };

    console.log('Search Controller');
}]);