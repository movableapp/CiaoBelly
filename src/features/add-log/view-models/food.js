
var extend = require('utils/extend');
var commonViewModel = require('./common');

var FoodViewModel = extend({}, commonViewModel, {
    init: function() {
        this.type = 'Food';
    }
});

exports.create = function() {
    var instance = Object.create(FoodViewModel);
    instance.init();
    return instance;
};
