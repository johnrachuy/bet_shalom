myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', 'DataFactory', '$location', '$uibModal', '$log',
  function($scope, $http, PassportFactory, DataFactory, $location, $uibModal, $log) {

  console.log('lesson plan controller');
  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = {};
  var typeBoolean;
  $scope.teacher = false;
  $scope.admin = false;
  $scope.search = false;
  $scope.holidays = ['Channukah', 'Yom Kipur'];
  $scope.animationsEnabled = true;
  $scope.lessonPlanStatus = 'submitted';
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

    if ($scope.lessonPlanStatus === 'submitted') {
      $scope.postLesson();
    } else if ($scope.lessonPlanStatus === 'needs review') {
      //function for admin to finalize lesson plan
    } else {
      //something
    }


  };

    $scope.postLesson = function() {

      if ($scope.type_selector === "resource") {
        typeBoolean = true;
      } else {
        typeBoolean = false;
      }

      var lessonPlan = {
        author: $scope.lesson_author,
        title: $scope.lesson_title,
        lesson_plan: {
          materials: $scope.lesson_materials,
          text: $scope.lesson_text
        },
        materials: $scope.required_materials,
        status: $scope.lessonPlanStatus,
        resource: typeBoolean

        // tags: $scope.tag
      };

      $scope.dataFactory.factorySaveLessonPlan(lessonPlan).then(function() {
        //notification of successful db post
        console.log('success');
      });


      console.log('lessonplan', lessonPlan);
    };

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        holidays: function () {
          return $scope.holidays;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);

angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, holidays) {

  $scope.holidays = holidays;
  $scope.selected = {
    holiday: $scope.holidays[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.holiday);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


