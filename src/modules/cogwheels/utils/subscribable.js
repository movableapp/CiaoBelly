'use strict';

function subscribe(event, callback) {
    var subscription = createSubscription.call(this, event, callback);
    this.subscriptions.push(subscription);
    return subscription;
}

function createSubscription(event, callback){

    var subscription = {
        event: new RegExp(event),
        callback: callback,
        dispose: function () {
            var i = this.subscriptions.indexOf(subscription);
            if (i >= 0) {
                this.subscriptions.splice(i, 1);
            }
            subscription.isDisposed = true;
        }.bind(this)
    };
    return subscription;
}

function publish(event, data) {

    var filter = function (subscription) {
        return event.match(subscription.event);
    };

    var callSubscriber = function (subscription) {
        if(subscription.isDisposed) {
            return;
        }
        subscription.callback(data);
    };

    this.subscriptions.filter(filter).forEach(callSubscriber);
}

exports.mixin = function (obj) {

    obj.subscriptions = [];
    obj.subscribe = subscribe;
    obj.publish = publish;

    return obj;
};

