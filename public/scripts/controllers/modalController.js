myApp.controller('ModalController', ['$scope', '$http', '$uibModalInstance', 'holidays', 'DataFactory', function ($scope, $http, $uibModalInstance, holidays, DataFactory){

  $scope.dataFactory = DataFactory;

  //console.log('hola', $scope.dataFactory.factoryStoredLessonId);
  //var lessonId = {lesson_id: $scope.dataFactory.factoryStoredLessonId};

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
}]);