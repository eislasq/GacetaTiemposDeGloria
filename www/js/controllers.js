angular.module('gaceta.controllers', [])

        .controller('AboutCtrl', function ($scope, Providers) {
            $scope.countProviders = function () {
                var count = 0, k;
                for (k in Providers) {
                    count++;
                }
                return count;
            };
        })

        .controller('ProvidersCtrl', function ($scope, Providers, Categories) {
            $scope.categorias = Categories;
            $scope.filterTemplateStatus = {categoria: ''};
            $scope.providers = Providers;
        })

        .controller('ProviderDetailCtrl', function ($scope, $stateParams, Providers) {
//            console.log($stateParams);
            $scope.provider = Providers[$stateParams.providerId];
//            console.log($scope.provider);

            $scope.splitNumbers = function (numeros) {
                if (numeros) {
                    return numeros.split(',');
                }
            };

            $scope.call = function (numero) {
                window.open('tel:' + numero, '_system', 'location=yes');
            };

            $scope.sms = function (numero) {
                window.open('sms:' + numero, '_system', 'location=yes');
            };

            $scope.geolocation = function (sucursal) {
                var address = sucursal.calle
                        + ' ' + sucursal.numero_exterior
                        + ' ' + sucursal.localidad
                        + ' ' + sucursal.estado
                        ;
                window.open('https://maps.google.com?q=' + escape(address), '_system', 'location=yes');
            };
        })
        ;
