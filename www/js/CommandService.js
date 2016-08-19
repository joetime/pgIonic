angular.module('starter')
    .service('CommandService', function() {

        var subscribers = {
            'camera': []
        };

        return {
            subscribe: function(eventName, callback) {

                if (!subscribers[eventName]) subscribers.eventName = [];

                subscribers[eventName].push(callback);
            },
            command: function(eventName, data) {

                // if no subscribers, nothing to do 
                if (!subscribers[eventName]) return;

                subscribers[eventName].forEach(function(element) {
                    if (element) element(data);
                }, this);
            }
        };

    })