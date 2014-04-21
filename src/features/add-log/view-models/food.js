
var extend = require('utils/extend');
var commonViewModel = require('./common');

var FoodViewModel = commonViewModel.extend({
    init: function() {
        this._init();
        this.type = 'Food';
    }
});

exports.create = commonViewModel.create.bind(FoodViewModel);
