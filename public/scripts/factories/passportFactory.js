myApp.factory('PassportFactory', ['$http', '$window', function($http, $window) {

    //private
    var userSubmit =  function(username, password) {
        var user = {
            username: username,
            password: password
        };
        console.log(user);
        var promise = $http.post('/', user).then(function(response) {
            usrNam = response.data;
            console.log(usrNam);
        });
        return promise;
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
    //
    //var checkRole = function() {
    //    if(role == 'Admin') {
    //
    //    } else {
    //
    //    }
    //};
}]);