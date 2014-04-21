
var extend = require('utils/extend');
var commonViewModel = require('./common');

var SleepViewModel = commonViewModel.extend({
    init: function() {
        this._init();
        this.type = 'Sleep';
    }
});

exports.create = commonViewModel.create.bind(SleepViewModel);
