'use strict';

angular
    .module('myCards', ['ngRoute', 'ngSanitize'])
    .config(function($routeProvider){
        $routeProvider.otherwise({
            redirectTo : '/cards'
        });
    });