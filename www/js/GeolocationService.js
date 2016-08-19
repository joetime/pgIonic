angular.module('starter').service('GeolocationService', ['$cordovaGeolocation', function($cordovaGeolocation) {

    return {
        GetCurrentPosition: getCurrentPosition,
        WatchPosition: watchPosition
    }

    function getCurrentPosition(success, error, options) {


        if (navigator) {

            // navigator preferred
            navigator.geolocation.getCurrentPosition(success, function(err) {

                if (err.code == 1)
                    console.warn('getCurrentPosition failed: permission denied.');

                else if (err.code == 2)
                    console.warn('getCurrentPosition failed: error retreving location.');

                else if (err.code == 3)
                    console.warn('getCurrentPosition failed: timeout occurred.');

                error(err);

            }, options);

        } else {
            // use cordova
            $cordovaGeolocation.getCurrentPosition(options)
                .then(
                    null,
                    function(err) {
                        if (err.code) console.log(err.code);
                        console.log(err.message);
                        if (error) error(err);
                    },
                    success);
        }
    }

    function watchPosition(success, error, options) {
        if (navigator) {

            // navigator preferred
            navigator.geolocation.watchPosition(success, function(err) {

                if (err.code == 1)
                    console.warn('getCurrentPosition failed: permission denied.');

                else if (err.code == 2)
                    console.warn('getCurrentPosition failed: error retreving location.');

                else if (err.code == 3)
                    console.warn('getCurrentPosition failed: timeout occurred.');

                error(err);

            }, options);

        } else {
            // use cordova
            $cordovaGeolocation.watchPosition(options)
                .then(
                    null,
                    function(err) {
                        if (err.code) console.log(err.code);
                        console.log(err.message);
                        if (error) error(err);
                    },
                    success);
        }
    }
}]);