myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', function($scope, $http, PassportFactory) {

  console.log('lesson plan controller');

  var typeBoolean;

  $scope.submitLesson = function() {

    console.log('checked', $scope.required_materials);

    if ($scope.type_selector == "resource") {
      typeBoolean = true;
    } else {
      typeBoolean = false;
    }

    var lessonPlan = {
      author: $scope.lesson_author,
      title: $scope.lesson_title,
      lesson_plan: {
        materials: $scope.lesson_materials,
        text: $scope.lesson_text,
      },
      materials: $scope.required_materials,
      resource: typeBoolean

      // tags: $scope.tag
    };
    console.log('lessonplan', lessonPlan);
  };

}]);
