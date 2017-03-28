'use strict';

angular
    .module('card', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/card/:numPokemon', {
            templateUrl : './view-card/card.html',
            controller : 'CardCtrl'
        });
    });