myApp.controller('ModalController', ['$scope', '$http', '$uibModalInstance', 'holidays', 'DataFactory', '$location', function ($scope, $http, $uibModalInstance, holidays, DataFactory, $location){

  $scope.dataFactory = DataFactory;

  //cancel button for all modals
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
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
  }
}]);