'use strict';

angular
    .module('cards')
    .factory('CardsService', function($http, $q, $timeout){


        var Service = {};

        var from1To150 = '1';
        for(var index=2;index<152;index++){from1To150+=','+index;}
        var url = 'https://api.pokemontcg.io/v1/cards';
        var typeUrl = 'https://api.pokemontcg.io/v1/types';
        var config = {
            params : {
                supertype : 'Pokémon',
                nationalPokedexNumber : from1To150,
                pageSize: 1000
            }
        };
        var appel = $http.get(url, config).then(function (response) {
            return response.data.cards;
        }, function (response) {
            console.warn("erreur blblblbl");
            return [];
        })
        var appelUnique = appel.then(function (cards) {
            var fait = {};
            var filteredcards =  cards.filter(function (card) {
                if(fait[card.nationalPokedexNumber]!==undefined){
                    //J'ai déjà un de ces congénère (même nationalPokedexNumber)
                    return false;
                }
                fait[card.nationalPokedexNumber] = true;
                return true;
            });
            return filteredcards;
        });
        var appelElement = $http.get(typeUrl);

        var timeStep = 8;
        function callBack(defer, index, max){
            $timeout(function(){
                defer.notify(index/max);
            },500*index);
        }

        Service.getList = function(){
            var defer = $q.defer();
            appelUnique.then(function(list){
                defer.resolve(list);
            });
            for(var i=0;i<timeStep;i++){
                callBack(defer, i+1, timeStep);
            }
            return defer.promise;
        };

        // Service.getById = function (id) {
        //     return appel.then(function (cards) {
        //         for (var index in cards) {
        //             var pokemon = cards[index];
        //             if (pokemon.id === id) {
        //                 return pokemon;
        //             }
        //         }
        //         return {};
        //     }, function () {
        //         console.warm('erreur chargement liste');
        //         return {};
        //     });
        //
        // };



        Service.getByNumPokemon = function (numPokemon) {
            numPokemon = parseInt(numPokemon);
            return appel.then(function (cards) {
                var cardsNumPokemon = [];
                for (var index in cards) {
                    var pokemon = cards[index];
                    console.log(pokemon.nationalPokedexNumber, numPokemon);
                    if (pokemon.nationalPokedexNumber === numPokemon) {
                        cardsNumPokemon.push(pokemon);
                    }
                }
                return cardsNumPokemon;
            }, function () {
                console.warm('erreur chargement ');
                return [];
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