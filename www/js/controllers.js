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
        })
        ;
