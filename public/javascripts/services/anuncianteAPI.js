angular.module('petApp').factory('loginService', function($http, config){

    var _login = function(anunciante){
        return $http.post(config.baseUrl +  '/login', anunciante);
    };

    return {
        login: _login
    }
});