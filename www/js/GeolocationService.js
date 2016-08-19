angular.module('starter').service('GeolocationService', ['$cordovaGeolocation', function($cordovaGeolocation) {

    return {
        GetCurrentPosition: getCurrentPosition,
        WatchPosition: watchPosition
    }

    function getCurrentPosition(success, error, options) {


        if (navigator) {

            // navigator preferred
            navigator.geolocation.getCurrentPosition(success, function(err) {

                err.msg = getErrorMessage(err.code);

                console.warn(err.msg);
                error(err);

            }, options);

        } else {
            // use cordova
            $cordovaGeolocation.getCurrentPosition(options)
                .then(
                    null,
                    function(err) {
                        err.msg = getErrorMessage(err.code);
                        console.warn(err.msg);
                        error(err);
                    },
                    success);
        }
    }

    function getErrorMessage(code) {
        var msg = 'getCurrentPosition failed: '
        if (code == 1)
            return msg + 'permission denied.';
        else if (code == 2)
            return msg + 'location unavailable on this device.';

        else if (code == 3)
            return msg + 'timeout occurred.';
        else
            return msg + 'unknown reason, code=' + code;
    }

    function watchPosition(success, error, options) {
        if (navigator) {

            // navigator preferred
            navigator.geolocation.watchPosition(success, function(err) {

                err.msg = getErrorMessage(err.code);
                console.warn(err.msg);
                error(err);

            }, options);

        } else {
            // use cordova
            $cordovaGeolocation.watchPosition(options)
                .then(
                    null,
                    function(err) {
                        err.msg = getErrorMessage(err.code);
                        console.warn(err.msg);
                        error(err);
                    },
                    success);
        }
    }
}]);