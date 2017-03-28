'use strict'

angular
    .module('cards')
    .controller('CardsCtrl', [
        '$scope',
        'CardsService',
        '$rootScope',
        function($scope, CardsService, $rootScope){

            $rootScope.monTitre = 'Les cartes Pokemons';

            $scope.enCours = true;
            $scope.avancement = 0;
            CardsService.getList().then(function(data){
                $scope.enCours = false;
                $scope.cards = data;
            }, undefined, function(avancement){
                $scope.avancement = avancement;
            });

            CardsService.getElements().then(function(elements){
                $scope.elements = elements;
            });

        }]);

