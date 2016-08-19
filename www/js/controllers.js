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

.controller('AccountCtrl', function($scope, $cordovaGeolocation, MapService) {
    $scope.settings = {
        enableFriends: true
    };
    $scope.logs = ['begin log'];

    function log(msg, obj) {
        console.log(msg, obj);
        if (obj)
            $scope.logs.push(msg + ':' + JSON.stringify(obj));
        else
            $scope.logs.push(msg);
    }
    var map;

    $scope.lat = "?";
    $scope.lng = "?";
    log('lat lng ' + $scope.lat + ' ' + $scope.lng);


    function updateLocation(position) {
        $scope.lat = position.coords.latitude
        $scope.lng = position.coords.longitude
        $scope.lastUpdated = new Date();
        log('lat lng ' + $scope.lat + ' ' + $scope.lng);
        if (map) MapService.CenterMap(map, $scope.lat, $scope.lng)
    }

    function initMap() {
        //console.log('initMap()...')
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 20
        });
        //console.log(map);
    }
    initMap();

    // get position
    var posOptions = {
        timeout: 10000,
        enableHighAccuracy: false,
        maximumAge: 5000
    };

    var watch = $cordovaGeolocation.watchPosition(posOptions);
    watch.then(
        null,
        function(err) {
            // error
            log('watch position error: ' + JSON.stringify(err));
        },
        function(position) {
            log('position updated');
            updateLocation(position)
        });
});