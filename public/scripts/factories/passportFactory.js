myApp.factory('PassportFactory', ['$http', '$location', function($http, $location) {

    //private
    var loggedInUser = {};

    //login
    var userSubmit =  function(username, password) {
        var user = {
            username: username,
            password: password
        };

        $http.post('/', user).then( function(response) {
            loggedInUser = response.data;

            if(response.data.role == 'admin') {
                $location.path('/admin_dash');
            } else {
                $location.path('/teacher_dash');
            }
        });
    };

    //add new user
    var saveNewEntry = function(entry) {
        var promise = $http.post('/register', entry).then( function(response) {
            newEntry = response.data;
        });
        return promise;
    };

    //update existing user
    var saveUpdatedEntry = function(entry) {
        var promise = $http.post('/update_user', entry).then( function(response) {
            updatedEntry = response.data;
        });
        return promise;
    };


    //public
    var publicApi = {
        factoryUserAuthentication: function() {
            return privateUserAuthentication();
        },
        factoryUserSubmit: function(username, password) {
            return userSubmit(username, password);
        },
        factoryLoggedInUser: function() {
            return loggedInUser;
        },
        factorySaveNewEntry: function(entry) {
            return saveNewEntry(entry);
        },
        factorySaveUpdatedEntry: function(entry) {
            return saveUpdatedEntry(entry);
        },

    };

    return publicApi;

}]);