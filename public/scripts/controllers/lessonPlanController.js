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
  $scope.lessonPlanId = 1;
  $scope.edit = true;
  $scope.holidays = ['Channukah', 'Yom Kipur'];
  $scope.animationsEnabled = true;
  $scope.lessonPlanStatus = 'submitted';
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  console.log($scope.loggedInUser);
  var lessonPlan ={};


  validateUser();

  if ($scope.edit === true){
    $scope.dataFactory.factoryGetLessonPlan($scope.lessonPlanId).then(function() {
      $scope.savedLessonPlan = $scope.dataFactory.factoryLessonPlan();
      console.log($scope.savedLessonPlan);
    });
  }

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

    createLessonPlanObject();

    $scope.dataFactory.factorySaveLessonPlan(lessonPlan).then(function() {
      //notification of successful db post
      console.log('success');
    });

    console.log('lessonplan', lessonPlan);
  };

  $scope.publishLesson = function() {
    if ($scope.lessonPlanStatus === 'submitted') {
      $scope.submitLesson();
    } else {
      $scope.editLesson();
    }
    console.log('publish button');
  };


  $scope.editLesson = function() {
    createLessonPlanObject();

    $scope.dataFactory.factoryEditLessonPlan(lessonPlan).then(function() {
      //notification of successful db post
      console.log('success');
    });
  };

  var createLessonPlanObject = function() {
    if ($scope.type_selector === "resource") {
      typeBoolean = true;
    } else {
      typeBoolean = false;
    }

    lessonPlan = {
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
  };


 //modal
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


