angular.module('gaceta.controllers.edit', [])
        .controller('EditCtrl', function ($scope, WS, $ionicLoading, $ionicScrollDelegate, Categories, Providers) {
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
//                    console.log('almacenando llave', llave);
                    localStorage.setItem('llave', llave);
                } else {
//                    console.log('eliminando llave');
                    localStorage.removeItem('llave');
                }
            };
            $scope.entrar = function (llave) {
                var request = WS.miNegocio(llave);
                $ionicLoading.show({
                    template: 'Espere...'
                });
                request.then(function (result) {/* success function */
//                    console.log('success');
//                    console.log(result);
                    $scope.negocio = result.data.response;
                    $ionicLoading.hide();
//                    console.log(result.data.output);
                    if (!result.data.response) {
                        alert(':( Llave invalida');
                    } else {
                        $ionicScrollDelegate.resize();
                    }
                },
                        function (result) {/* error function */
//                            console.log('error');
//                            console.log(result);
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
//                console.log('guardar', llave, $scope.negocio);
                var request = WS.guardarMiNegocio(llave, $scope.negocio);
                $ionicLoading.show({
                    template: 'Espere...'
                });
                request.then(function (result) {/* success function */
//                    console.log('success');
//                    console.log(result);
                    $ionicLoading.hide();
//                    console.log(result.data.output);
                    if (!result.data.response) {
                        alert(':( No se pudo guardar.');
                    } else {
                        alert(':) Guardaro con éxito!');
                        $scope.entrar(llave);
                        //actualizar localmente
                        localStorage.setItem('provider_' + $scope.negocio.negocio_id, JSON.stringify($scope.negocio));
                        Providers[$scope.negocio.negocio_id] = $scope.negocio;
                        //
                    }
                },
                        function (result) {/* error function */
//                            console.log('error');
//                            console.log(result);
                            $ionicLoading.hide();
                            alert(':( Algo anda mal con la conección; ' + result.statusText);
                        });
            };

            document.addEventListener('hidekeyboard', onKeyboardHide, false);
            function onKeyboardHide(e) {
                console.log('ocultado');
                $scope.outFocusAll()
            }

            window.addEventListener('native.keyboardhide', keyboardHideHandler);

            function keyboardHideHandler(e) {
                console.log('native ocultado');
                $scope.outFocusAll()
            }

            $scope.outFocusAll = function () {

                var i = document.querySelectorAll('input');
                Array.prototype.map.call(i, function (ix) {
                    ix.blur();
                });
            };

            $scope.escanearLlave = function () {
                $ionicLoading.show({
                    template: 'Abriendo la camara...'
                });
                console.log('escanear');
//                setTimeout(function () {
//                    var llave = 123;
//                    $scope.llave = llave;
//                    $scope.entrar(llave);
//                    $scope.almacenarLlave(llave);
//                }, 0);
                cordova.plugins.barcodeScanner.scan(
                        function (result) {
                            $ionicLoading.hide();
                            var llave = result.text;
                            if (!llave) {
                                return false;
                            }
                            $scope.llave = llave;
                            $scope.entrar(llave);
                            $scope.almacenarLlave(llave);
                        },
                        function (error) {
                            $ionicLoading.hide();
                            alert("Fallo el escaneo: " + error);
                        }
                );
            };
        })
        ;