myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', 'DataFactory', function($scope, $http, PassportFactory, DataFactory) {

  console.log('lesson plan controller');
  $scope.dataFactory = DataFactory;

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

    $scope.dataFactory.factorySaveLessonPlan(lessonPlan).then(function() {
      //notification of successful db post
      console.log('success');
    });


    console.log('lessonplan', lessonPlan);
  };

}]);
