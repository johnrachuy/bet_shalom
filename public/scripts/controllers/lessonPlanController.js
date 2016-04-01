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

    //currently hardcoded
  $scope.lessonPlanId = 1;

    //currently Hardcoded
  $scope.edit = true;


  $scope.animationsEnabled = true;
  $scope.lessonPlanStatus = 'submitted';
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  console.log($scope.loggedInUser);
  var lessonPlan ={};


  validateUser();

  if ($scope.edit === true){
    $scope.dataFactory.factoryGetLessonPlan($scope.lessonPlanId).then(function() {
      $scope.savedLessonPlan = $scope.dataFactory.factoryLessonPlan();
      console.log('What we want from the returned variable in data factory', $scope.savedLessonPlan);
      populateLessonForEdit();

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
    //console.log('checked', $scope.required_materials);
    console.log('submit lesson');

    createLessonPlanObject();

    $scope.dataFactory.factorySaveLessonPlan(lessonPlan).then(function() {
      //notification of successful db post
      console.log('success');
    });

    console.log('lessonplan', lessonPlan);
  };

  $scope.publishLesson = function() {
    if ($scope.lessonPlanStatus === 'submitted') {
      $scope.editLesson();
    } else {
      $scope.submitLesson();
    }
    console.log('publish button');
  };


  $scope.editLesson = function() {
    console.log('edit lesson');
    $scope.lessonPlanStatus = 'published';
    createLessonPlanObject();
    console.log('lesson plan::', lessonPlan);

    $scope.dataFactory.factoryEditLessonPlan(lessonPlan);
      //notification of successful db post
      console.log('success');
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
        text: $scope.lesson_text,
        admin_comment: $scope.admin_comment
      },
      materials: $scope.required_materials,
      status: $scope.lessonPlanStatus,
      resource: typeBoolean,

      //hardcoded currently
      lesson_id: $scope.lessonPlanId


      // tags: $scope.tag
    };
  };


  var populateLessonForEdit = function() {

    if ($scope.savedLessonPlan[0].materials == true) {
      $scope.required_materials = true;
    }
    $scope.lesson_author = $scope.savedLessonPlan[0].author;
    $scope.lesson_title = $scope.savedLessonPlan[0].title;
    $scope.lesson_materials = $scope.savedLessonPlan[0].lesson_plan.materials;
    $scope.lesson_text = $scope.savedLessonPlan[0].lesson_plan.text;
    $scope.admin_comment= $scope.savedLessonPlan[0].lesson_plan.admin_comment;

  };

  var populateTagDropdown = function() {
    //The three separate get-calls are for testing purposes. Reduce later
    $http.get('/tags').then(function(response) {
      console.log('tags from get call:: ', response.data);
      var tagsAreFun = response.data;
      $scope.tags = tagsAreFun;
    });
    $http.get('/tags').then(function(response) {
      console.log('tags from get call:: ', response.data);
      var tagsAreCool = response.data;
      $scope.moreTags = tagsAreCool;

    });
    $http.get('/tags').then(function(response) {
      console.log('tags from get call:: ', response.data);
      var tagsAreSweet = response.data;
      $scope.evenMoreTags = tagsAreSweet;

    });
  };

  populateTagDropdown();

 //modal
  $scope.addSelectedTag = function() {
    var myTag = $scope.selectedTag;
    var myEl = angular.element(document.querySelector('#added_tag_container'));
    myEl.append('<span>' + myTag + ' </span>');
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


