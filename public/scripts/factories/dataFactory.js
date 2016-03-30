myApp.factory('DataFactory', ['$http', function($http) {



//The private function to save a lesson plan
var saveLessonPlan = function(lessonPlan){
  var promise = $http.post('/lesson', lessonPlan).then(function(response) {
    console.log(response);
  });
  return promise;
};

var editLessonPlan = function(lessonPlan){
    $http.put('lesson', lessonPlan).then(function(response) {
        console.log(response);
    });
};

  var publicApi = {
      factorySaveLessonPlan: function(lessonPlan){
        return saveLessonPlan(lessonPlan);
      },
      factoryEditLessonPlan: function(lessonPlan){
          return editLessonPlan(lessonPlan);
      }
  };

  return publicApi;

}]);
