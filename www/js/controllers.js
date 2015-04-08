angular.module('starter.controllers', [])

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

        .controller('LocationCtrl', function ($scope) {
            var myLatlng = new google.maps.LatLng(-98.451363, 19.707787);

            var myOptions = {
                center: myLatlng,
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };

            var map = new google.maps.Map(document.getElementById("map"), myOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                title: "Tiempos de Gloria!"
            });

// To add the marker to the map, call setMap();
            marker.setMap(map);

        });
