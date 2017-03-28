'use strict';

angular
    .module('myCards', ['ngRoute', 'ngSanitize', 'cards'])
    .config(function($routeProvider){
        $routeProvider.otherwise({
            redirectTo : '/cards'
        });
    });