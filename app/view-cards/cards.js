'use strict';

angular
    .module('cards', ['ngRoute'])
    .config(function($routeProvider){
        $routeProvider.when('/cards', {
            templateUrl : './view-cards/cards.html',
            controller : 'CardsCtrl'
        });

        // BasketService.setBig(500);
    });
