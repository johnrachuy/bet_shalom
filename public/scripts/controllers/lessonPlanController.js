myApp.controller('LessonPlanController', ['$scope', '$http', 'PassportFactory', 'DataFactory', '$location', '$uibModal', '$log',
  function($scope, $http, PassportFactory, DataFactory, $location, $uibModal, $log) {
  console.log('lesson plan controller');
  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  //store the logged-in user
  $scope.loggedInUser = {};
  //Sets the default state of the radio buttons for resource or lesson plan to be lesson plan
  $scope.$parent.type_selector = "lesson_plan";
  //attempted to set a default on the text box but it doesn't seem to work when trying to write
  $scope.required_materials = false;

  //True/false variables that are tied to what's shown on the page based on the logged-in user
  $scope.teacher = false;
  $scope.admin = false;
  $scope.search = false;

  //Stores the id of the lesson plan from the factory, sent by the page the user came from
  $scope.lessonPlanId = $scope.dataFactory.factoryStoredLessonId;
  //Tracks what the status of the lesson is, changes based on where the user is coming from
  $scope.lessonPlanStatus = false;
  //Sets whether the page is editable or not, changes based on where the user is coming from
  $scope.edit = true;
  //Tracks whether the lesson is a resource or normal lesson, set on the dom by the admin
  var resourceOrLessonBoolean;
  //declares the empty lessonPlan object used to package up data to be sent to the database
  var lessonPlan = {};

  //clears form
  function clearForm () {
    $scope.lesson_author = $scope.loggedInUser.first_name + ' ' + $scope.loggedInUser.last_name;
    $scope.lesson_title = null;
    $scope.lesson_materials = null;
    $scope.lesson_text = null;
    $scope.admin_comment = null;
    $scope.required_materials = false;
    $scope.lessonPlanStatus = null;
    $scope.lessonPlanId = null;
    resourceOrLessonBoolean = undefined;

    // Naming will be changed with added tag search
    $scope.selectedTag = null;
    $scope.selectedTagg = null;
    $scope.selectedTaggg = null;
  }


  $scope.holidays = ['Channukah', 'Yom Kipur'];
  $scope.animationsEnabled = true;



  //Gets the information from the factory about who is logged in and calls
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  console.log($scope.loggedInUser);

  validateUser();

  //Sets the edit variable that controls the stae of the page from the factory
  $scope.edit = $scope.dataFactory.factoryLessonViewState;

  //Checks to see if the page should be editable and if so populates it based on the stored lession id
  if ($scope.edit === true) {
    $scope.dataFactory.factoryGetLessonPlan($scope.lessonPlanId).then(function() {
      $scope.savedLessonPlan = $scope.dataFactory.factoryLessonPlan();
      /*
       * Sets lessonPlanStatus to the 'status' property coming back from the database.
       * This allows the 'Publish' button to determine whether to POST or PUT. -Savio
       */
      $scope.lessonPlanStatus = $scope.savedLessonPlan[0].status;
      console.log($scope.lessonPlanStatus);
      console.log('What we want from the returned variable in data factory', $scope.savedLessonPlan);
      populateLessonForEdit();
    });
    $scope.dataFactory.factoryLessonViewState = false;
  } else {
    $scope.lesson_author = $scope.loggedInUser.first_name + ' ' + $scope.loggedInUser.last_name;
  }
  //function that checks the current user and either kicks them off the page or changes the variables that set the state
    //of the page
  function validateUser() {
    if($scope.loggedInUser.role == 'admin') {
      $scope.admin = true;
    } else if ($scope.loggedInUser.role == 'teacher') {
      $scope.teacher = true;
    } else {
      $location.path('/home');
    }
  }

  //Checks to see if the admin is publishing a new lesson or a teacher submitted lesson and calls the correct function
  $scope.publishLesson = function() {
    if ($scope.lessonPlanStatus === 'submitted') {
      $scope.editLesson();
    } else {
      $scope.submitLesson();
    }
    console.log('publish button');
  };

  //Inserts a new lesson into the database
  $scope.submitLesson = function() {
    //console.log('checked', $scope.required_materials);
    console.log('submit lesson');
    /*
     * if statement checks the role of user. Admin's submissions are immediately published, while teacher submission
     * requires admin review
     */
    if ($scope.admin === true) {
      $scope.lessonPlanStatus = 'published';
    } else if ($scope.teacher === true) {
      $scope.lessonPlanStatus = 'submitted';
    }
    /*
     * $scope.lessonPlanStatus is now set. Function to create object will use new lessonPlanStatus
     */
    createLessonPlanObject();

    $scope.dataFactory.factorySaveLessonPlan(lessonPlan).then(function() {
      //notification of successful db post
      console.log('success');
    });

    console.log('lessonplan', lessonPlan);

    clearForm();
  };

  //Updates a lesson in the database
  $scope.editLesson = function() {
    console.log('edit lesson');
    $scope.lessonPlanStatus = 'published';
    createLessonPlanObject();
    console.log('lesson plan::', lessonPlan);

    $scope.dataFactory.factoryEditLessonPlan(lessonPlan);
      //notification of successful db post
      console.log('success');

    clearForm();
  };

  //Packages up the current lesson into an object to be sent to the database
  var createLessonPlanObject = function() {
    if ($scope.type_selector === "resource") {
      resourceOrLessonBoolean = true;
    } else {
      resourceOrLessonBoolean = false;
    }

    lessonPlan = {
      author: $scope.lesson_author,
      author_id: $scope.loggedInUser.users_id,
      title: $scope.lesson_title,
      lesson_plan: {
        materials: $scope.lesson_materials,
        text: $scope.lesson_text,
        admin_comment: $scope.admin_comment
      },
      materials: $scope.required_materials,
      status: $scope.lessonPlanStatus,
      resource: resourceOrLessonBoolean,

      //hardcoded currently
      lesson_id: $scope.lessonPlanId,


      tags: []
    };

    // lessonPlan object property 'tags' is assigned the value of the global 'tags' array created by ngTagsInput
    lessonPlan.tags = $scope.tags;


  };

  //populates the inputs with the retrieved lesson plan
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


  //Auto-complete function for ngTagsInput -savio
  $scope.loadTags = function($query) {
    return $http.get('/tags', { cache: true}).then(function(response) {
      var keyTags = response.data;
      return keyTags.filter(function(tag) {
        return tag.tag_name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
    });
  };

  /*
   * Functions that populate and remove tag_id from tags array when tags are selected with ngTagsInput
   */
  $scope.tags = [];
  $scope.tagAdded = function(tag) {
    console.log('Tag added: ', tag);
    $scope.tags.push(tag.tag_id);
    console.log($scope.tags);
  };
  $scope.tagRemoved = function(tag) {
    console.log('Tag removed: ', tag);
    var removedTag = $scope.tags.indexOf(tag.tag_id);
    if(removedTag != -1) {
      $scope.tags.splice(removedTag, 1);
    }
    console.log($scope.tags);
  };

  /*
   * End of add/remove tag functions -Savio
   */

    //modal
  $scope.addSelectedTag = function() {
    var myTag = $scope.selectedTag;
    var myEl = angular.element(document.querySelector('#added_tag_container'));
    myEl.append('<span>' + myTag + ' </span>');
    console.log('selectedTagg', $scope.selectedTagg);
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


 //variable and functions for a possible modal:

    //$scope.animationsEnabled = true;


//  $scope.addSelectedTag = function() {
//    var myTag = $scope.selectedTag;
//    var myEl = angular.element(document.querySelector('#added_tag_container'));
//    myEl.append('<span>' + myTag + ' </span>');
//    console.log('selectedTagg', $scope.selectedTagg);
//  };
//
//
//  $scope.open = function (size) {
//    var modalInstance = $uibModal.open({
//      animation: $scope.animationsEnabled,
//      templateUrl: 'myModalContent.html',
//      controller: 'ModalInstanceCtrl',
//      size: size,
//      resolve: {
//        holidays: function () {
//          return $scope.holidays;
//        }
//      }
//    });
//
//    modalInstance.result.then(function (selectedItem) {
//      $scope.selected = selectedItem;
//    }, function () {
//      $log.info('Modal dismissed at: ' + new Date());
//    });
//  };
//
}]);


//Another controller with the code for a possible modal

//angular.module('myApp').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, holidays) {
//
//  $scope.holidays = holidays;
//  $scope.selected = {
//    holiday: $scope.holidays[0]
//  };
//
//  $scope.ok = function () {
//    $uibModalInstance.close($scope.selected.holiday);
//  };
//
//  $scope.cancel = function () {
//    $uibModalInstance.dismiss('cancel');
//  };
//});


