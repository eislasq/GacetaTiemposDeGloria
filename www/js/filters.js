angular.module('starter.filters', [])
        .filter('filterObject', function () {
            return function (items, search) {
                if (search && search['*'] != undefined) {
                    search = search['*'];
                }
                if (!search) {
                    return items;
                }

                var result = {};
//                console.log('###################');
                for (var key in items) {//cada elemento del objeto
                    var value = items[key];
                    if (typeof search === 'string') {
                        for (var key2 in value) {//buscar en todas las propiedades del elemento
                            var value2 = value[key2];
                            if (typeof value2 === 'string') {
                                if (value2.toUpperCase().indexOf(search.toUpperCase()) > -1) {
                                    result[key] = value;
                                    break;
                                }
                            }

                        }
                    } else if (typeof search === 'object') {
                        for (var prop in search) {//buscar en las propiedades definidas
                            var searchString = search[prop];
                            if (typeof value[prop] === 'string') {
                                if (value[prop].toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
                                    result[key] = value;
                                    break;
                                }
                            }
                        }
                    }

                }
//                $ionicScrollDelegate.scrollTo(0, 0, false);
                return result;

            }
        })
        .filter('ucfirst', function () {
            return function (input, arg) {
                return input.replace(/(?:^|\s)\S/g, function (a) {
                    return a.toUpperCase();
                });
            };
        });