/*global describe, it, expect, before, beforeEach, after, afterEach*/
var bus = require('message-bus');
describe('message-bus', function () {
    describe('subscriptions', function () {

        beforeEach(function () {
            
        });
        afterEach(function () {
            bus.channel.subscriptions = [];
        });
        it('should support subscribe once', function () {
            var value = 0;
            var subscription = bus.subscribeOnce('test', function (data) {
                value++;
            });
            bus.publish('test');

            bus.publish('test');
            expect(value).to.equal(1);
            expect(subscription.isDisposed).to.be.true;
        });
        it('should support regex match events', function () {
            var value = 0;
            bus.subscribe('test', function () {
                value++;
            });
            bus.subscribe('test:asdf', function () {
                value++;
            });

            bus.publish('test:asdf');
            expect(value).to.equal(2);


        });
    });
    describe('message wrapping', function () {

        beforeEach(function () {
        });
        afterEach(function () {
            bus.channel.subscriptions = [];
        });
        it('should wrap published data with a message container', function () {
            bus.subscribe('test', function (msg) {
                expect(msg.data).to.equal(1);
            });
            bus.publish('test', 1);
        });
        it('should add event to message', function () {

            bus.subscribe('test', function (msg) {
                expect(msg.event).to.equal('test');
            });
            bus.publish('test', 1);
        });
    });
});


