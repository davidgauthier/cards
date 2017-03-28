'use strict';

angular
    .module('cards')
    .factory('CardsService', function($http, $q, $timeout){

        var Pokemon=["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

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
        }).then(function (cards) {
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
            appel.then(function(list){
                defer.resolve(list);
            });
            for(var i=0;i<timeStep;i++){
                callBack(defer, i+1, timeStep);
            }
            return defer.promise;
        };

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