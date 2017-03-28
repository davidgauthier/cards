(function () {
    'use strict';

    angular
        .module('cards')
        .controller('CardsCtrl', [
            '$scope',
            '$http',
            function ($scope, $http) {


                var type = 'cards';

                var url = 'https://api.magicthegathering.io/v1';
                $http.get(url).then(function(response){
                    console.log(response.cards);
                });
            }
        ]);

})