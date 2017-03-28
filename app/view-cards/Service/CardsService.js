'use strict';

angular
    .module('cards')
    .factory('CardsService', function(){


        var Service = {};


        Service.getList = function () {
            
            var url = 'https://api.pokemontcg.io/v1/cards';
            var appel = $http.get(url);
            

            Service.getList = function(){
                return appel.then(function (response) {
                    return response.data;
                }, function(){
                    console.warn('Arg, impossible de charger la liste de cartes');
                });
            };

        };


        return Service;


    });




