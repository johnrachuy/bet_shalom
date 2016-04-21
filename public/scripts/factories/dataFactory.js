myApp.factory('DataFactory', ['$http', function($http) {

    //lessonPlan stores information for a single lesson plan, used to populate the lesson plan view
    var lessonPlan = undefined;
    //lessonPlans stores the information for all the chosen lesson plans
    var lessonPlans = {};
    //Variables to store the state and the lesson id for the lesson plan view
    var lessonViewState = undefined;
    var lessonStatus = undefined;
    var lessonId = undefined;
    var favoritePlans = {};
    var favorite = {};
    var myFavorite = {};
    var adminLessons = {};
    var names = {};
    var user = {};

    //The private function to save a lesson plan
    var saveLessonPlan = function(lessonPlan){
        var promise = $http.post('/lesson', lessonPlan).then(function(response) {
        });
        return promise;
    };

    //The private function to update a lesson plan
    var editLessonPlan = function(lessonPlan){
        $http.put('/lesson', lessonPlan).then(function(response) {
        });
    };

    //The private function to retrieve a lesson plan based on a passed-in user id
    var retrieveLessonPlan = function(id){
        var promise = $http.get('/lesson/' + id).then(function(response) {
            lessonPlan = response.data;
        });
        return promise;
    };

    //function to retrieve all the lessons based on the user id, only gets all lessons until tables are in place
    var teacherRetrieveLessonPlans = function(id){
        var promise = $http.get('/teacher_dashboard/' + id).then(function(response) {
            lessonPlans = response.data;
        });
        return promise;
    };

    //function to retrieve all the lessons based on the status, only getting all at the moment because I'm bad at sql ;D
    var adminRetrieveLessonPlans = function(id){
        var promise = $http.get('/admin_dashboard/' + id).then(function(response) {
            adminLessons = response.data;
        });
        return promise;
    };

    //function to add favorite status on lesson plan
    var addFavorite = function(favorite){
        var promise = $http.post('/favorite', favorite).then(function(response) {
        });
        return promise;
    };

    //function to get lesson plans favorites to teacher dashboard
    var getFavorites = function(id){
        var promise = $http.get('/get_favorites/' + id).then(function(response) {
            favoritePlans = response.data;
        });
        return promise;
    };

    //function to check logged in users favorites
    var checkFavorite = function(id, lesson){
        var promise = $http.get('/favorite?id=' + id + '&lesson=' + lesson).then(function(response) {
            myFavorite = response.data[0];
        });
        return promise;
    };

    //function update favorite status on lesson plan
    var updateFavorite = function(id){
        var promise = $http.put('/favorite', id).then(function(response) {
        });
        return promise;
    };

    //function to add comment
    var addComment = function(lessonPlan) {
        var promise = $http.put('/add_comment', lessonPlan).then(function(response) {
        });
        return promise;
    };

    //function to populate existing users drop down on manage users page
    var getNames = function() {
        var promise = $http.get('/get_names').then(function(response) {
            names = response.data;
        });
        return promise;
    };

    //function to get info for selected name from existing users drop down
    var selectedName = function(name) {
        var promise = $http.get('/selected_name/' + name).then(function(response) {
            user = response.data;
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
      factoryTeacherRetrieveLessonPlans: function(id){
          return teacherRetrieveLessonPlans(id);
      },
      factoryAdminRetrieveLessonPlans: function(id) {
          return adminRetrieveLessonPlans(id);
      },
      factoryLessonPlans: function(){
          return lessonPlans;
      },
      factoryLessonViewState: function(){
          return lessonViewState;
      },
      factoryLessonStatus: function(){
          return lessonStatus;
      },
      factoryStoredLessonId: function(){
          return lessonId;
      },
      factoryAddFavorite: function(favorite) {
          return addFavorite(favorite);
      },
      factoryGetFavorites: function(id) {
          return getFavorites(id);
      },
      factoryGetFavoritePlans: function(){
          return favoritePlans;
      },
      factoryCheckFavorite: function(id, lesson) {
          return checkFavorite(id, lesson);
      },
      factoryMyFavorite: function() {
          return myFavorite;
      },
      factoryGetNames: function() {
          return getNames();
      },
      factoryNames: function() {
          return names;
      },
      factorySelectedName: function(name) {
          return selectedName(name);
      },
      factoryName: function() {
          return user;
      },
      factoryUpdateFavorite: function(id) {
          return updateFavorite(id);
      },
      factoryAddComment: function(lessonPlan) {
          return addComment(lessonPlan);
      },
      factoryAdminLessons: function(){
          return adminLessons;
      }
  };

  return publicApi;
}]);