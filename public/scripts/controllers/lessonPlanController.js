myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', function($scope, $http, PassportFactory) {

  console.log('lesson plan controller');

  $scope.submitLesson = function() {

    var lessonPlan = {
      author: $scope.lesson_author,
      title: $scope.lesson_title,
      materials: $scope.lesson_materials,
      text: $scope.lesson_text,
      type: $scope.type_selector
      // tags: $scope.tag
    };
    console.log('lessonplan', lessonPlan);
  };

}]);
