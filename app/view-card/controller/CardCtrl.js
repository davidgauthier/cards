'use strict';

angular
    .module('card')
    .controller('CardCtrl', [
        '$scope',
        '$routeParams',
        '$http',
        '$rootScope',
		'CardsService',
        function($scope, $routeParams, $http, $rootScope, CardsService){

            $rootScope.monTitre = 'Une carte';

            CardsService.getByNumPokemon($routeParams.numPokemon).then(function(cards){
                $scope.cardsNumPokemon = cards;
            });

        }]);