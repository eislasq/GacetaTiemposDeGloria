angular.module('gaceta.services', [])

        .service('WS', function ($http) {
//            this.serverUrl = 'http://gaceta.bugs3.com/server.php';
//            this.serverUrl = 'http://localhost/~eislas/GacetaServer/server.php';
            this.serverUrl = 'http://resolute-oxygen-95315.appspot.com';
            this.miNegocio = function (llave) {
                var request = $http({
                    url: this.serverUrl + '?action=miNegocio'
                    , async: true
                    , method: 'POST'
                    , data: {llave: llave}
                    , headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01'
                        , 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                return request;
            };
            this.guardarMiNegocio = function (llave, negocio) {
                var request = $http({
                    url: this.serverUrl + '?action=guardarMiNegocio'
                    , async: true
                    , method: 'POST'
                    , data: {llave: llave, negocio: negocio}
                    , headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01'
                        , 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                return request;
            };
            this.obtenerCategorias = function () {
                var request = $http({
                    url: this.serverUrl + '?action=obtenerCategorias'
                    , async: true
                    , method: 'POST'
                    , data: {}
                    , headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01'
                        , 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                return request;
            };
            this.obtenerProveedoresActualizadosDespuesDe = function (lastUpdate) {
                var request = $http({
                    url: this.serverUrl + '?action=obtenerProveedoresActualizadosDespuesDe'
                    , async: true
                    , method: 'POST'
                    , data: {fecha: lastUpdate}
                    , headers: {
                        'Accept': 'application/json, text/javascript, */*; q=0.01'
                        , 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                });
                return request;
            };
        })
        ;
