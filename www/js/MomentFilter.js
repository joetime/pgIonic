angular.module('starter').filter('moment', function() {
    return function(input, formatString) {
        return moment(input).format(formatString);
    }
})