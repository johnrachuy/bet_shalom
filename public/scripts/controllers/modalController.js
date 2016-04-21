myApp.controller('ModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance){

  //cancel button for all modals
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.okay = function() {
    $uibModalInstance.close();
  };

//modal for when delete button clicked
  $scope.deleteLessonPlan = function () {
    $uibModalInstance.close();
  };

  //modal for when saved draft button is clicked
  $scope.okaySavedDraft = function() {
    $uibModalInstance.close();
  };

//modal for when teacher submits lesson for approval
  $scope.okaySubmit = function() {
    $uibModalInstance.close();
  };

  //modal for when admin publishes a lesson
  $scope.okayPublish = function() {
    $uibModalInstance.close();
  };

//modal for when admin clicks needsreview button
  $scope.okayNeedsReview = function() {
    $uibModalInstance.close();
  };

  //modal for when user resets password
  $scope.okayResetPassword = function() {
    $uibModalInstance.close();
  };

  $scope.okayTitle = function() {
    $uibModalInstance.close();
  };

}]);