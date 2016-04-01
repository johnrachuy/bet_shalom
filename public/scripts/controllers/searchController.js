myApp.controller('SearchController', ['$scope', 'PassportFactory', '$http', '$window', function($scope, PassportFactory, $http, $window) {

    $http.get('/tags').then(function(response) {
        $scope.keyTags = response.data;
    });

    $scope.searchTag = function() {
        $http.get('/tag_search/'+ $scope.selectedTag).then(function(response) {
            $scope.viewLesson = response.data;
            $scope.selectedName = null;
        });
    };

    console.log('Search Controller');
}]);