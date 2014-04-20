
var extend = require('utils/extend');
var commonViewModel = require('./common');

var SleepViewModel = extend({}, commonViewModel, {
    init: function() {
        this.type = 'sleep';
    }
});

exports.create = function() {
    var instance = Object.create(SleepViewModel);
    instance.init();
    return instance;
};
