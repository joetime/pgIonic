angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, GeolocationService, MapService) {

    var map;
    $scope.logs = ['begin log'];
    $scope.lat = "?";
    $scope.lng = "?";

    function tryScopeAppy() {
        try {
            $scope.$apply();
        } catch (err) {
            // nothing
        }
    }


    // get position
    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 5000
    };
    var defaultCenter = {
        lat: 38.28669916469537,
        lng: -76.58446155495623
    }; // patterson park

    function log(msg, obj) {
        console.log(msg, obj);
        if (obj)
            $scope.logs.push(msg + ':' + JSON.stringify(obj));
        else
            $scope.logs.push(msg);
    }

    document.addEventListener('deviceready', function() {
        log('deviceready');
        initMap();
        getPosition();

        startWatch();

        try {
            $scope.$apply();
        } catch (err) {
            log('$apply error', err)
        }
    });
    var rep = 0;

    $scope.refreshLocation = function() {
        getPosition();
    }

    function getPosition() {
        log('getting position...');
        GeolocationService.GetCurrentPosition(
            function(position) {
                log('GetCurrentPosition success')
                updateLocation(position);
            },
            function(err) {
                log('GetCurrentPosition error ', err.msg);
                tryScopeAppy();
                //if (rep < 10) getPosition(); // try again
            },
            posOptions
        );
    }

    function startWatch() {
        log('starting watch position...');
        GeolocationService.WatchPosition(
            function(position) {
                log('WatchPosition update')
                updateLocation(position);
                // center map on user
                if (map) MapService.CenterMap(map, $scope.lat, $scope.lng)
            },
            function(err) {
                log('WatchPosition error ', err.msg);
                tryScopeAppy();
            },
            posOptions
        );
    }

    function updateLocation(position) {
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.lastUpdated = new Date();
        log('lat lng ' + $scope.lat + ' ' + $scope.lng);

    }

    function initMap() {
        log('initializing map');
        map = new google.maps.Map(document.getElementById('map'), {
            center: defaultCenter,
            zoom: 16
        });
    }
});