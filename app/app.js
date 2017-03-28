'use strict';

angular
    .module('myCards', ['ngRoute', 'ngSanitize', 'cards', 'card'])
    .config(function($routeProvider){
        $routeProvider.otherwise({
            redirectTo : '/cards'
        });
    });