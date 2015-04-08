angular.module('starter.services', [])

        .service('Providers', function ($http) {

            this.providers = {};
            var p = localStorage.getItem('providers');
            if (p) {
                this.providers = JSON.parse(p);
            }

//                var providers =this.providers;
            var url = 'https://spreadsheets.google.com/feeds/list/1OC4e6dHyVz4JbAxm3zLGzz4ahaYVScxkXhUkSpp9HfY/od6/public/values?alt=json';
            var request = $http({
                url: url
                , async: false
                , method: 'GET'
                , headers: {'Accept': 'application/json'}});

            this.getProviders = function (callback) {
                if (Object.keys(this.providers).length > 0) {
                    console.log('providers cacheados');
                    callback(this.providers);
                } 
                    console.log('providers from google');
                    request.then(function (result) {/* success function */
                        var providers = {};
                        for (var entryIndex in result.data.feed.entry) {
                            var entry = result.data.feed.entry[entryIndex];
                            var provider = {};
                            for (var propertyName in entry) {
                                var property = entry[propertyName];
                                if (propertyName.indexOf('gsx$') >= 0) {
                                    var newPropertyName = propertyName.substr(4, propertyName.length - 4);
                                    if (newPropertyName === 'logo' && !property['$t']) {
                                        property['$t'] = 'img/nopreview.jpg';
                                    }
                                    provider[newPropertyName] = property['$t'].trim();
                                }
                            }
                            providers[provider.id] = provider;

                        }
                        localStorage.setItem('providers', JSON.stringify(providers));
                        callback(providers);
                    },
                            function (result) {/* error function */
                                console.log('Error: ', result);
                                callback(this.providers);
                            });
                
            };
            this.getProviderById = function (id) {
                var p = localStorage.getItem('providers')
                var providers = JSON.parse(p)
                return providers[id];
            };


        })

        .factory('Chats', function () {
            // Might use a resource here that returns a JSON array

            // Some fake testing data
            var chats = [{
                    id: 0,
                    name: 'Ben Sparrow',
                    lastText: 'You on your way?',
                    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
                }];

            return {
                all: function () {
                    return chats;
                },
                remove: function (chat) {
                    chats.splice(chats.indexOf(chat), 1);
                },
                get: function (chatId) {
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i].id === parseInt(chatId)) {
                            return chats[i];
                        }
                    }
                    return null;
                }
            };
        });
