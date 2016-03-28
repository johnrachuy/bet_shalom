myApp.factory('PassportFactory', ['$http', '$location', function($http, $location) {

    //private
    var loggedInUser = {};

    var userSubmit =  function(username, password) {
        var user = {
            username: username,
            password: password
        };
        console.log(user);
        $http.post('/', user).then( function(response) {
            loggedInUser = response.data;
            console.log(loggedInUser);

            if(response.data.role == 'admin') {
                $location.path('/admin_dash');
            } else {
                $location.path('/teacher_dash');
            }
        });
    };

    //var privateUserAuthentication = function() {
    //    var promise = $http.get('/user').then(function(response) {
    //        if (response.data) {
    //
    //            var userData = {
    //                username: response.data.username,
    //                users_id: response.data.users_id,
    //                role: response.data.role
    //            };
    //
    //            return userData;
    //        } else {
    //            $window.location.href = '/index.html';
    //        }
    //    });
    //    return promise;
    //};

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



    };

    return publicApi;


    //var checkIfLoggedIn = function() {
    //    $http.get('/user').then(function(response) {
    //        if(response.data) {
    //            userName = response.data.username;
    //            role = response.data.role;
    //            console.log('User Name: ', userName);
    //            console.log('User Role: ', role);
    //        } else {
    //            $window.location.href = '/login.html';
    //        }
    //    });
    //};
}]);