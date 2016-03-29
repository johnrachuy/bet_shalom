myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', 'DataFactory', '$location', function($scope, $http, PassportFactory, DataFactory, $location) {

  console.log('lesson plan controller');
  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = {};
  var typeBoolean;
  $scope.teacher = false;
  $scope.admin = false;
  $scope.search = false;


  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  console.log($scope.loggedInUser);

  validateUser();

  function validateUser() {
    if($scope.loggedInUser.role == 'admin') {
      $scope.admin = true;
    } else if ($scope.loggedInUser.role == 'teacher') {
      $scope.teacher = true;
    } else {
      $location.path('/home');
    }
  }

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
