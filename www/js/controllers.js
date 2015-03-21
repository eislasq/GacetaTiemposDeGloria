angular.module('starter.controllers', [])

        .controller('AboutCtrl', function ($scope) {
        })

        .controller('ProvidersCtrl', function ($scope, Providers) {
            $scope.providers = [];
            $scope.filterTemplateStatus = {categoria: ''};
            Providers.getProviders(function (respuesta) {
//                console.log(respuesta);
                var providers = {};
                for (var entryIndex in respuesta.data.feed.entry) {
                    var entry = respuesta.data.feed.entry[entryIndex];
                    var provider = {};
                    for (var propertyName in entry) {
                        var property = entry[propertyName];
                        if (propertyName.indexOf('gsx$') >= 0) {
                            var newPropertyName = propertyName.substr(4, propertyName.length - 4);
                            if (newPropertyName === 'logo' && !property['$t']) {
                                property['$t'] = 'img/nopreview.jpg';
                            }
                            provider[newPropertyName] = property['$t'];
//                            console.log(propertyName, newPropertyName, property);
                        }

                    }
//                    console.log(provider);
                    providers[provider.id] = provider;

                }
                console.log(providers);
                $scope.providers = providers;
            });
        })

        .controller('ProviderDetailCtrl', function ($scope, $stateParams, Chats) {
            $scope.chat = Chats.get($stateParams.chatId);
        })

        .controller('LocationCtrl', function ($scope) {
            $scope.settings = {
                enableFriends: true
            };
        });
