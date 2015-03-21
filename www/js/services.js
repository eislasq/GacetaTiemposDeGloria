angular.module('starter.services', [])

        .service('Providers', function ($http) {
            this.getProviders = function (callback) {
//                var providers =this.providers;
                var url = 'https://spreadsheets.google.com/feeds/list/1OC4e6dHyVz4JbAxm3zLGzz4ahaYVScxkXhUkSpp9HfY/od6/public/values?alt=json';
                var request = $http({
                    url: url
                    , async: false
                    , method: 'GET'
                    , headers: {'Accept': 'application/json'}});
                request.then(function (result) {/* success function */
                    callback(result);
                },
                        function (result) {/* error function */
                            callback(result);
                        });

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
