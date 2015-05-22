angular.module('gaceta.factories', [])
        .factory('Categories', function (WS) {
            var categories = [];
            var request = WS.obtenerCategorias()
            request.then(function (result) {/* success function */
                console.log('success');
                console.log(result);
                console.log(result.data.output);
                if (!result.data.response) {
                    console.log('No se pudieron obtener las categorias');
                } else {
                    result.data.response.map(function (category) {
                        categories.push(category);
                    });
//                    categories.push(result.data.response);
                    console.log('categories:', categories);
                }
            },
                    function (result) {/* error function */
                        console.log('error');
                        console.log(result);
                        alert(':( Algo anda mal con la conección; ' + result.statusText);
                    });
            return categories;
        })
        ;