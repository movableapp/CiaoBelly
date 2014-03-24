'use strict';

var subscribable = require('../utils/subscribable');

var bus = {
    channel: subscribable.mixin({}),
    subscribe: function (event, callback) {
        return this.channel && this.channel.subscribe(event, callback);
    },
    publish: function (event, data) {

        var message = {
            data: data,
            event: event
        };
        if(!this.channel) {
            return;
        }
        this.channel.publish(event, message);
    },
    subscribeOnce: function (event, callback) {

		if(!this.channel) {
			return;
		}
        var subscription = this.channel.subscribe(event, callback);
        var cb = subscription.callback;
        subscription.callback = function () {
            cb.apply(subscription, arguments);
            subscription.dispose.bind(subscription)();
        };

        return subscription;
    }
};


module.exports = bus;