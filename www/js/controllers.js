angular.module('gaceta.controllers', [])

        .controller('AboutCtrl', function ($scope) {
            $scope.registeredProviders = window.registeredProviders;
        })

        .controller('ProvidersCtrl', function ($scope, Providers) {
            $scope.providers = [];
            $scope.filterTemplateStatus = {categoria: ''};
            Providers.getProviders(function (providers) {
                window.registeredProviders = Object.keys(providers).length;
                console.log(window.registeredProviders);
                $scope.providers = providers;
            });
        })

        .controller('ProviderDetailCtrl', function ($scope, $stateParams, Providers) {
            console.log($stateParams);
            $scope.provider = Providers.getProviderById($stateParams.providerId);
            console.log($scope.provider);
        })

        .controller('EditCtrl', function ($scope, WS, $ionicLoading, $ionicScrollDelegate, Categories) {
            $scope.categorias = Categories;
            var llave = localStorage.getItem('llave');
            if (llave && llave != 'null' && llave != 'undefined' && llave != 'false') {
                $scope.llave = llave;
                $scope.recordarLlave = true;
            } else {
                $scope.recordarLlave = false;
            }
            $scope.cambioRecordarLlave = function (recordarLlave, llave) {
                $scope.recordarLlave = recordarLlave;
                $scope.almacenarLlave(llave);
            };
            $scope.almacenarLlave = function (llave) {
                if ($scope.recordarLlave) {
                    console.log('almacenando llave', llave);
                    localStorage.setItem('llave', llave);
                } else {
                    console.log('eliminando llave');
                    localStorage.removeItem('llave');
                }
            };
            $scope.entrar = function (llave) {
                var request = WS.miNegocio(llave);
                $ionicLoading.show({
                    template: 'Espere...'
                });
                request.then(function (result) {/* success function */
                    console.log('success');
                    console.log(result);
                    $scope.negocio = result.data.response;
                    $ionicLoading.hide();
                    console.log(result.data.output);
                    if (!result.data.response) {
                        alert(':( Llave invalida');
                    } else {
                        $ionicScrollDelegate.resize();
                    }
                },
                        function (result) {/* error function */
                            console.log('error');
                            console.log(result);
                            $ionicLoading.hide();
                            alert(':( Algo anda mal con la conección; ' + result.statusText);
                        });
            };
            if ($scope.llave) {
                $scope.entrar($scope.llave);
            }
            $scope.salir = function () {
                $scope.negocio = false;
                if (!$scope.recordarLlave) {
                    $scope.llave = '';
                }
                $ionicScrollDelegate.resize();
            };
            $scope.nuevaSucursal = function () {
                $scope.negocio.sucursales.push({nombre: $scope.negocio.sucursales.length + 1});
                $ionicScrollDelegate.resize();
                $ionicScrollDelegate.scrollBy(0, 100, true);
            };
            $scope.eliminarSucursal = function (sucursalIndex) {
                if (confirm('Confirma que quieres eliminar esta sucursal')) {
                    $scope.negocio.sucursales.splice(sucursalIndex, 1);
                    $ionicScrollDelegate.resize();
                }
            };
            $scope.guardarCambios = function (llave) {
                console.log('guardar', llave, $scope.negocio);
                var request = WS.guardarMiNegocio(llave, $scope.negocio);
                $ionicLoading.show({
                    template: 'Espere...'
                });
                request.then(function (result) {/* success function */
                    console.log('success');
                    console.log(result);
                    $ionicLoading.hide();
                    console.log(result.data.output);
                    if (!result.data.response) {
                        alert(':( No se pudo guardar.');
                    } else {
                        alert(':) Guardaro con éxito!');
                        $scope.entrar(llave);
                    }
                },
                        function (result) {/* error function */
                            console.log('error');
                            console.log(result);
                            $ionicLoading.hide();
                            alert(':( Algo anda mal con la conección; ' + result.statusText);
                        });
            }
        });
