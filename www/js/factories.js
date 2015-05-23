angular.module('gaceta.factories', [])
        .factory('Categories', function (WS) {
            var categories = [];
            var request = WS.obtenerCategorias()
            request.then(function (result) {/* success function */
//                console.log(result);
                if (!result.data.response) {
//                    console.log('No se pudieron obtener las categorias');
                } else {
                    result.data.response.map(function (category) {
                        categories.push(category);
                    });
//                    console.log('categories:', categories);
                }
            },
                    function (result) {/* error function */
//                        console.log('error');
//                        console.log(result);
                        alert(':( Algo anda mal con la conección; ' + result.statusText);
                    });
            return categories;
        })
        .factory('Providers', function (WS) {
            var providers = [];
            for (var key in localStorage) {
                if ('provider_' == key.substr(0, 9)) {
                    var provider = JSON.parse(localStorage.getItem(key));
                    providers[provider.negocio_id] = provider;
                }
            }
            var lastUpdate = localStorage.getItem('lastUpdate');
            if (!lastUpdate || 'undefined' == lastUpdate || 'null' == lastUpdate) {
                lastUpdate = '2015-01-01 00:00:00';
            }
//            console.log('lastUpdate', lastUpdate);
            var request = WS.obtenerProveedoresActualizadosDespuesDe(lastUpdate);
            request.then(function (result) {/* success function */
//                console.log(result);
                if (!result.data.response) {
                    alert(':( No se pudieron obtener actualizaciones');
                } else {
                    localStorage.setItem('lastUpdate', result.data.response.lastUpdate);
                    result.data.response.providers.map(function (provider) {
                        localStorage.setItem('provider_' + provider.negocio_id, JSON.stringify(provider));
                        providers[provider.negocio_id] = provider;
                    });
                    console.log('providers Actualizados:', providers);
                }
            },
                    function (result) {/* error function */
//                        console.log('error');
//                        console.log(result);
                        alert(':( Algo anda mal con la conección, No se pudo actualizar; ' + result.statusText);
                    });
            return providers;
        })
        ;