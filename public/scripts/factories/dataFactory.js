myApp.factory('DataFactory', ['$http', function($http) {

    var lessonPlan = undefined;
    var lessonPlans = {};


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

//function to retrieve all the lessons based on the user id, only gets all lesson until tables are in place
var retrieveLessonPlans = function(userId){
    var promise = $http.get('/dashboard').then(function(response) {
        lessonPlans = response.data;
        console.log('DataFactory: ' + lessonPlans);
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
      },
      factoryRetrieveLessonPlans: function(userId){
          return retrieveLessonPlans(userId);
      },
      factoryLessonPlans: function(){
          return lessonPlans;
      }
  };

  return publicApi;

}]);
