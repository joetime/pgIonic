angular.module('starter').filter('moment', function() {
    return function(input, formatString) {
        if (!input) return '';
        return moment(input).format(formatString);
    }
})