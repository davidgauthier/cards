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
                pageSize: 1000
            }
        };
        var appel = $http.get(url, config);
        var appelElement = $http.get(typeUrl);



        Service.getList = function(){
            return appel.then(function (response) {
                return response.data['cards'];
            }, function(){
                console.warn('Arg, impossible de charger la liste de cartes');
                return [];
            });
        };

        Service.getById = function (id) {
            return appel.then(function (response) {
                for (var index in response.data) {
                    var pokemon = response.data[index];
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