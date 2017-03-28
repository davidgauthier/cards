'use strict'

angular
    .module('cards')
    .controller('CardsCtrl', [
        '$scope',
        'CardsService',
        '$rootScope',
        function($scope, CardsService, $rootScope){

            $rootScope.monTitre = 'Les cartes Pokemons';

            CardsService.getList().then(function(data){
               $scope.cards = data;
           });

        }]);

