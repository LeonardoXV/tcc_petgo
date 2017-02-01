angular.module('petApp').config( function($httpProvider){
    $httpProvider.interceptors.push('loginInterceptor');
});