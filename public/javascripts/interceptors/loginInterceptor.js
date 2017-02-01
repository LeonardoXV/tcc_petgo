angular.module('petApp').factory('loginInterceptor', function($rootScope, $q){
        return {
            request: function(config){
                config.headers = config.headers || {};
                if(localStorage.token){
                    config.headers['accesstoken'] = localStorage.token;
                }
                return config;
            }
        }
});