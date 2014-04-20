
var extend = require('utils/extend');
var commonViewModel = require('./common');

var TrainViewModel = extend({}, commonViewModel, {
    init: function() {
        this.type = 'Train';
    }
});

exports.create = function() {
    var instance = Object.create(TrainViewModel);
    instance.init();
    return instance;
};
