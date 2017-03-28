'use strict';

angular
    .module('cards')
    .factory('CardsService', function($http){


        var Service = {};
        var url = 'https://api.pokemontcg.io/v1/cards';
        var typeUrl = 'https://api.pokemontcg.io/v1/types';
        var config = {
            params : {
                supertype : 'Pokémon',
                pageSize : 500
            }
        };
        var appel = $http.get(url, config)
        var appelElement = $http.get(typeUrl);

        Service.getList = function(){
            return appel.then(function (response) {
                return response.data['cards'];
            }, function(){
                console.warn('Arg, impossible de charger la liste de cartes');
                return [];
            });
        };



        // Service.getList = function(){
        //     return appel.then(function(cards){
        //         var groupes = [];
        //         for(var index in cards){
        //             var card = cards[index];
        //             if(le groupe de la carte n'existe pas dans groupes){
                        // alors je crée le groupe de carte
        //             }
        //         }
        //         return groupes;
        //     });
        // };

        Service.getById = function (id) {
            return appel.then(function (cards) {
                for (var index in cards) {
                    var pokemon = cards[index];
                    if (pokemon.id === id) {
                        return pokemon;
                    }
                }
                return {};
            }, function () {
                console.warm('erreur chargement liste');
                return {};
            });

        };

        Service.getElements = function(){
            return appelElement.then(function (response) {
                return response.data['types'];
            }, function(){
                console.warn('Arg, impossible de charger la liste des éléments');
                return [];
            });
        };

        return Service;
    });