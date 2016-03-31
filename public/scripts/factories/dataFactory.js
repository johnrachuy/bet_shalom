myApp.factory('DataFactory', ['$http', function($http) {

    var lessonPlan = undefined;


//The private function to save a lesson plan
var saveLessonPlan = function(lessonPlan){
  var promise = $http.post('/lesson', lessonPlan).then(function(response) {
    console.log(response);
  });
  return promise;
};

var editLessonPlan = function(lessonPlan){
    $http.put('/lesson', lessonPlan).then(function(response) {
        console.log(response);
    });
};

var retrieveLessonPlan = function(id){
    console.log(id);
    var promise = $http.get('/lesson/' + id).then(function(response) {
        lessonPlan = response.data;
        console.log(lessonPlan);
    });
    return promise;
};

  var publicApi = {
      factorySaveLessonPlan: function(lessonPlan){
        return saveLessonPlan(lessonPlan);
      },
      factoryEditLessonPlan: function(lessonPlan){
          return editLessonPlan(lessonPlan);
      },
      factoryGetLessonPlan: function(id){
          return retrieveLessonPlan(id);
      },
      factoryLessonPlan: function(){
          return lessonPlan;
      }
  };

  return publicApi;

}]);
