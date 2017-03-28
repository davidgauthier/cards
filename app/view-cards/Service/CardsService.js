'use strict';

angular
    .module('cards')
    .factory('CardsService', function($http){


        var Service = {};
        var url = 'https://api.pokemontcg.io/v1/cards';
        var config = {
            params : {
                series : 'base'
            }
        };
        var appel = $http.get(url, config);


        Service.getList = function(){
            return appel.then(function (response) {
                return response.data;
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
        return Service;
    });