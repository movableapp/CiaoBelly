
var extend = require('utils/extend');
var commonViewModel = require('./common');

var TrainViewModel = commonViewModel.extend({
    init: function() {
        this._init();
        this.type = 'Train';
    }
});

exports.create = commonViewModel.create.bind(TrainViewModel);
