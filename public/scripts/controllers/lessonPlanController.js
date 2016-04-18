myApp.controller('LessonPlanController', ['$scope', '$http', '$route', 'PassportFactory', 'DataFactory', '$location', '$uibModal', '$log',
  function($scope, $http, $route, PassportFactory, DataFactory, $location, $uibModal, $log) {
  console.log('lesson plan controller');
  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  //store the logged-in user
  $scope.loggedInUser = {};
  //Sets the default state of the radio buttons for resource or lesson plan to be lesson plan
  $scope.$parent.type_selector = "lesson_plan";
  //Sets the required materials text box default to false so if it is never clicked a value will still get written to
    //the database
  $scope.required_materials = false;
  $scope.lessonPlanUsed = false;

  //Sets whether the page is editable or not, changes based on where the user is coming from
  $scope.loadSavedLesson = false;

  //True/false variables that are tied to what's shown on the page based on the logged-in user
  $scope.teacherEditState = false;
  $scope.adminEditState = false;

  $scope.commentButton = true;

  /*
   * boolean variables for button ng-if
   */
  $scope.statusToCheckIfPublished = false;
  $scope.statusAdminReview = false;
  $scope.needsReviewButton = false;
  $scope.removeButton = false;

  $scope.myFav = [];

  //Tracks what the status of the lesson is, changes based on where the user is coming from
  $scope.lessonPlanStatus = {};
  //Tracks whether the lesson is a resource or normal lesson, set on the dom by the admin
  var resourceOrLessonBoolean;
  //declares the empty lessonPlan object used to package up data to be sent to the database
  var lessonPlan = {};

  $scope.saved_comments = {};

    var favorite = {};
  //tracks if the lesson is to be deleted (archived)
  var lessonDeleted = false;

  $scope.commentForm = false;

  var commentSavedInDb = false;

  $scope.animationsEnabled = true;



  //Gets the information from the factory about who is logged in and calls
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  console.log($scope.loggedInUser);

  validateUser();

  //Stores the id of the lesson plan from the factory, sent by the page the user came from
  $scope.lessonPlanId = $scope.dataFactory.factoryStoredLessonId;

  //Sets the edit variable that controls the state of the page from the factory
  $scope.loadSavedLesson = $scope.dataFactory.factoryLessonViewState;
  if($scope.dataFactory.factoryLessonStatus == 'submitted') {
    $scope.statusAdminReview = true;
    $scope.needsReviewButton = true;
    $scope.removeButton = true;
    if($scope.loggedInUser.role === 'admin') {
      $scope.commentForm = true;
      $scope.commentButton = false;
    }
  }
  if($scope.dataFactory.factoryLessonStatus == 'published') {
    $scope.statusToCheckIfPublished = true;
    $scope.statusAdminReview = true;
    $scope.needsReviewButton = false;
    $scope.removeButton = true;
    $scope.commentForm = true;
  }
  $scope.dataFactory.factoryLessonStatus = undefined;


  //Checks to see if the page should be editable and if so populates it based on the stored lesson id
  if ($scope.loadSavedLesson === true) {

    $scope.dataFactory.factoryGetLessonPlan($scope.lessonPlanId).then(function() {
      $scope.savedLessonPlan = $scope.dataFactory.factoryLessonPlan();
      /*
       * Sets lessonPlanStatus to the 'status' property coming back from the database.
       * This allows the 'Publish' button to determine whether to POST or PUT. -Savio
       */
      $scope.lessonPlanStatus = $scope.savedLessonPlan[0].status;

      //if($scope.lessonPlanStatus === 'draft' || $scope.lessonPlanStatus === 'submitted') {
      //  if ($scope.loggedInUser.role === 'admin'){
      //    console.log('role:', $scope.loggedInUser.role);
      //    $scope.commentForm = true;
      //  } else {
      //    $scope.commentForm = false;
      //  }
      //} else {
      //  $scope.commentForm = false;
      //}

      populateLessonForEdit();
      checkFav();
    });
    $scope.dataFactory.factoryLessonViewState = false;
  } else {
    $scope.lesson_author = $scope.loggedInUser.first_name + ' ' + $scope.loggedInUser.last_name;
  }

  //clears form
  function clearForm () {
    $scope.lesson_author = $scope.loggedInUser.first_name + ' ' + $scope.loggedInUser.last_name;
    $scope.lesson_title = null;
    $scope.lesson_materials = null;
    $scope.lesson_text = null;
    $scope.comment = null;
    $scope.required_materials = false;
    $scope.lessonPlanStatus = null;
    $scope.lessonPlanId = null;
    document.getElementById("uploadedFile").src = "";
    lessonDeleted = false;
    resourceOrLessonBoolean = "lesson_plan";

    // Naming will be changed with added tag search
    $scope.selectedTag = null;
    $scope.tags = [];
    $scope.saved_comments = [];
    $route.reload();
  }

  function clearCommentField () {
    $scope.comment = null;
  }

  //function that checks the current user and either kicks them off the page or changes the variables that set the state
    //of the page
  function validateUser() {
    if($scope.loggedInUser.role == 'admin') {
      $scope.adminEditState = true;
    } else if ($scope.loggedInUser.role == 'teacher') {
      $scope.teacherEditState = true;
    } else {
      $location.path('/home');
    }
  }

    //Function to check favorite status
    function checkFav() {
      $scope.dataFactory.factoryCheckFavorite($scope.loggedInUser.users_id, $scope.lessonPlanId).then(function () {
        $scope.myFav = $scope.dataFactory.factoryMyFavorite();
      })
    }

  //Favorites a lesson plan
  $scope.addFav = function() {
    console.log($scope.myFav);
    if ($scope.myFav == undefined) {
      console.log('new favorite');
      favorite = {
        fk_users_id: $scope.loggedInUser.users_id,
        fk_fav_lesson_id: $scope.lessonPlanId,
        favorite_status: true
      };
      $scope.dataFactory.factoryAddFavorite(favorite).then(function () {
        checkFav();
      });
    } else {
      console.log('updated');
      fav_id = {
        favorite_id: $scope.myFav.favorite_id
      };
      $scope.dataFactory.factoryUpdateFavorite(fav_id).then(function () {
        checkFav();
      })
    }
  };

    $scope.lesson_title = [];

  //Checks to see if the current lesson is new or a pre-existing lesson, sets the status, and redirects to the appropriate
    //function to handle the database call (admin only button)
  $scope.adminPublishLesson = function(size) {

    if (Object.keys($scope.selectedTag).length == 0) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modalNoTags.html',
        controller: 'ModalController',
        size: size,
        resolve: {
          myUsername: function () {
            return $scope.username;
          },
          currentLessonPlan: function () {
            return $scope.lesson_title;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    } else {
      console.log('Has Tags');
      if (Object.keys($scope.lesson_title).length == 0) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalNoTitle.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            myUsername: function () {
              return $scope.username;
            },
            currentLessonPlan: function () {
              return $scope.lesson_title;
            }
          }
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      } else {
        console.log('Has Title');
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalPublish.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            myUsername: function () {
              return $scope.username;
            },
            currentLessonPlan: function () {
              return $scope.lesson_title;
            }
          }
        });

        modalInstance.result.then(function () {
          if ($scope.lessonPlanUsed == true) { //if statement checks to see if checkbox that activates comment field is true
            $scope.addComment();               //if unchecked, it does not add comments to JSON
          }

          if (Object.keys($scope.lessonPlanStatus).length == 0) {
            $scope.lessonPlanStatus = 'published';
            $scope.submitLesson();
          } else {
            $scope.lessonPlanStatus = 'published';
            $scope.editLesson();
          }
          //$location.path('/admin_dash');

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }
    }
  };

  //Checks to see if the current lesson is new or a pre-existing lesson, sets the status, and redirects to the appropriate
    //function to handle the database call (teacher only button)
  $scope.teacherSubmitLesson = function(size) {

    if (Object.keys($scope.selectedTag).length == 0) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modalNoTags.html',
        controller: 'ModalController',
        size: size,
        resolve: {
          myUsername: function () {
            return $scope.username;
          },
          currentLessonPlan: function () {
            return $scope.lesson_title;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    } else {
      console.log('Has Tags');
      if (Object.keys($scope.lesson_title).length == 0) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalNoTitle.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            myUsername: function () {
              return $scope.username;
            },
            currentLessonPlan: function () {
              return $scope.lesson_title;
            }
          }
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
        } else {
          console.log('Has Title');
          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalTeacherSubmit.html',
            controller: 'ModalController',
            size: size,
            resolve: {
              myUsername: function () {
                return $scope.username;
              },
              currentLessonPlan: function () {
                return $scope.lesson_title;
              }
            }
          });

          modalInstance.result.then(function () {

            if (Object.keys($scope.lessonPlanStatus).length == 0) {
              $scope.lessonPlanStatus = 'submitted';
              $scope.submitLesson();
            } else {
              $scope.lessonPlanStatus = 'submitted';
              $scope.editLesson();
            }
            //$location.path('/teacher_dash');

          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        }
      }
    };

  //When the save draft button is clicked redirects to the function to save a new draft or update existing draft
  $scope.saveLessonDraft = function(size) {
    if (Object.keys($scope.selectedTag).length == 0) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modalNoTags.html',
        controller: 'ModalController',
        size: size,
        resolve: {
          myUsername: function () {
            return $scope.username;
          },
          currentLessonPlan: function () {
            return $scope.lesson_title;
          }
        }
      });

      modalInstance.result.then(function () {

      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    } else {
      console.log('Has Tags');
      if (Object.keys($scope.lesson_title).length == 0) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalNoTitle.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            myUsername: function () {
              return $scope.username;
            },
            currentLessonPlan: function () {
              return $scope.lesson_title;
            }
          }
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      } else {
        if (Object.keys($scope.lessonPlanStatus).length == 0) {
          $scope.lessonPlanStatus = 'draft';
          $scope.submitLesson();
        } else {
          $scope.lessonPlanStatus = 'draft';
          $scope.editLesson();
        }
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modalSaveDraft.html',
          controller: 'ModalController',
          size: size,
          resolve: {
            myUsername: function () {
              return $scope.username;
            },
            currentLessonPlan: function () {
              return $scope.lesson_title;
            }
          }
        });

        modalInstance.result.then(function () {

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      }
    }
  };

  //When the needs review button is clicked changes the status to reflect that and calls the function to update the
  //database with the change
  $scope.needsReview = function(size){

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modalNeedsReview.html',
      controller: 'ModalController',
      size: size,
      resolve: {
        myUsername: function () {
          return $scope.username;
        },
        currentLessonPlan: function () {
          return $scope.lesson_title;
        }
      }
    });

    modalInstance.result.then(function () {
      if ($scope.lessonPlanStatus === null){
        alert('No lesson loaded.');
      } else {
        if ($scope.lessonPlanUsed == true) {
          $scope.addComment();
        }
        $scope.lessonPlanStatus = 'needs review';
        $scope.editLesson();
      }
      //$location.path('/admin_dash');

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  };

  //Inserts a new lesson into the database
  $scope.submitLesson = function() {
    console.log('submit lesson');
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
    console.log('edit function');
    createLessonPlanObject();
    console.log('lesson plan::', lessonPlan);

    $scope.dataFactory.factoryEditLessonPlan(lessonPlan);
      //notification of successful db post
      console.log('success');

    clearForm();
  };

  /*
   * Inserting comments into Lesson Plan row when 'Add Comment' button is clicked.
   */
  $scope.saved_comments =[]; //global empty array to push comment objects into
  var commentString = '';
  $scope.addComment = function(){
    //new comment object is created when 'Add Comment' button is pushed

    if($scope.loggedInUser.role == 'admin') {
      commentString = ' commented on ';
    } else {
      commentString = ' used this lesson plan on '
    }

    $scope.new_comment = {
      author: $scope.loggedInUser.first_name + ' ' + $scope.loggedInUser.last_name + commentString,
      date_stamp: new Date(),
      comment: $scope.comment
    };
    $scope.saved_comments.push($scope.new_comment); //object is pushed into saved_comments array

    console.log('new comments ', $scope.saved_comments);

    createLessonPlanObject(); // saved_comments are now included into existing lessonPlan

    console.log('lesson plan with new comment ', lessonPlan);

    $scope.dataFactory.factoryAddComment(lessonPlan).then(function() { //$http PUT to update comments
      console.log('new comment success');
      clearCommentField();
    })
  };
  /*
   * End addComment function -Savio
   */

  //When archive is clicked it sets the deleted property on the object to be sent to the database to 'true'
  $scope.removeLesson = function(size){

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modalDelete.html',
      controller: 'ModalController',
      size: size,
      resolve: {
        myUsername: function () {
          return $scope.username;
        },
        currentLessonPlan: function () {
          return $scope.lesson_title;
        }
      }
    });

    modalInstance.result.then(function () {
      var lessonId = {lesson_id: $scope.dataFactory.factoryStoredLessonId};

      $http.put('/remove_lesson', lessonId).then(function(){
        console.log('removed!');
      });

      clearForm();

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
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
        saved_comment: [],
        picture: document.getElementById("uploadedFile").src

      },
      materials: $scope.required_materials,
      status: $scope.lessonPlanStatus,
      resource: resourceOrLessonBoolean,
      deleted: lessonDeleted,

      //hardcoded currently
      lesson_id: $scope.lessonPlanId,

      tags: []
    };

    // lessonPlan object property 'tags' is assigned the value of the global 'tags' array created by ngTagsInput
    lessonPlan.tags = $scope.tags;
    lessonPlan.lesson_plan.saved_comment = $scope.saved_comments;

  };

  //populates the inputs with the retrieved lesson plan
  $scope.selectedTag = [];
  var populateLessonForEdit = function() {

    if ($scope.savedLessonPlan[0].materials == true) {
      $scope.required_materials = true;
    }
    if ($scope.savedLessonPlan[0].resource == true){
      $scope.type_selector = "resource";
    }
    $scope.lesson_author = $scope.savedLessonPlan[0].author;
    $scope.lesson_title = $scope.savedLessonPlan[0].title;
    $scope.lesson_materials = $scope.savedLessonPlan[0].lesson_plan.materials;
    $scope.lesson_text = $scope.savedLessonPlan[0].lesson_plan.text;
    $scope.saved_comments = $scope.savedLessonPlan[0].lesson_plan.saved_comment;
    $scope.admin_comment= $scope.savedLessonPlan[0].lesson_plan.admin_comment;
    document.getElementById("uploadedFile").src = $scope.savedLessonPlan[0].lesson_plan.picture;

    //This for loop grabs the tags retrieved from the lesson plan get call and creates a JSON for ngTagsInput
    //to populate the tag bar with tags associated with that lesson plan.
    for (var i = 0; i < $scope.savedLessonPlan.length; i++) {
      $scope.selectedTag.push({
        tag_id: $scope.savedLessonPlan[i].tag_id,
        tag_name: $scope.savedLessonPlan[i].tag_name,
        tag_category: $scope.savedLessonPlan[i].tag_category
      })
    }

    if($scope.saved_comments.length > 0) {
      commentSavedInDb = true;
    }
    console.log('comment if statement', commentSavedInDb);
    console.log('comments', $scope.saved_comments);

    //for (var i = 0; i < $scope.savedLessonPlan.length; i++) {
    //  $scope.selectedTag.push({
    //    tag_id: $scope.savedLessonPlan[i].tag_id,
    //    tag_name: $scope.savedLessonPlan[i].tag_name,
    //    tag_category: $scope.savedLessonPlan[i].tag_category
    //  })
    //}
    console.log($scope.selectedTag);
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
    if (Object.keys($scope.lessonPlanStatus).length == 0) {
      console.log('new');
      $scope.tags.push(tag.tag_id);
    } else {
      console.log('old');
      var update_tag = {
        tag_id: $scope.selectedTag[$scope.selectedTag.length -1].tag_id,
        lesson_id: $scope.lessonPlanId
      };
      //console.log(update_tag);

      $http.post('/update_tag', update_tag).then(function(response) {
        console.log(response);
      });
    }
  };
  $scope.tagRemoved = function(tag) {
    if (Object.keys($scope.lessonPlanStatus).length == 0) {
      console.log('new');
      var removedTag = $scope.tags.indexOf(tag.tag_id);
      if(removedTag != -1) {
        $scope.tags.splice(removedTag, 1);
      }
    } else {
      console.log('old');
      var update_tag = {
        tag_id: tag.tag_id,
        lesson_id: $scope.lessonPlanId
      };

      $http.put('/update_tag', update_tag).then(function(response) {
        console.log(response);
      });
    }
  };

  /*
   * End of add/remove tag functions -Savio
   */
  $scope.requiredMaterialsPlaceholder = 'Click Checkbox to Add Materials';
  $scope.toggleMaterialsRequirement = function(materials) {
    //$scope.isCollapsed = !$scope.isCollapsed;
    if(materials == false){
      $scope.lesson_materials = null;
      $scope.requiredMaterialsPlaceholder = 'Click Checkbox to Add Materials';
    } else {
      $scope.requiredMaterialsPlaceholder = 'Add Materials';
    }
  };


  $scope.usedLessonPlanToggle = function(used) {
    //$scope.isCollapsed = !$scope.isCollapsed;
    if(used == false){
      $scope.admin_comment = null;
    }
  };

  //Grabs the file the user selects and attemtps to upload it to the server
  $scope.uploadFile = function() {
    var file = $scope.files[0];
    if(file == null){
      alert("No file selected.");
    }
    else{
      get_signed_request(file);
    }
  };

  //Gets signed url to allow you to upload your file to aws
  function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          var response = JSON.parse(xhr.responseText);
          upload_file(file, response.signed_request, response.url);
        }
        else{
          alert("Could not get signed URL.");
        }
      }
    };
    xhr.send();
  }

  //Uploads your file to aws and places it one the dom
  function upload_file(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
      if (xhr.status === 200) {
        document.getElementById("uploadedFile").src = url;
      }
    };
    xhr.onerror = function() {
      alert("Could not upload file.");
    };
    xhr.send(file);
  }
}]);


