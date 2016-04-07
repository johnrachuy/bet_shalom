myApp.controller('ModalController', ['$scope', '$http', '$uibModalInstance', 'holidays', 'DataFactory', function ($scope, $http, $uibModalInstance, holidays, DataFactory){

  $scope.dataFactory = DataFactory;

//modal for when delete button clicked
  $scope.deleteLessonPlan = function () {
    $uibModalInstance.close();

    //$scope.modalFactory.factoryMessage('this is my message');

    //$http.put('/remove_lesson', lessonId).then(function(){
    //  console.log('removed!');
    //});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


  //modal for when saved draft button is clicked
  $scope.okaySavedDraft = function() {
    $uibModalInstance.close();
  }
}]);