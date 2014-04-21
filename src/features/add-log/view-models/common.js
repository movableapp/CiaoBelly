
var vm = require('vm');
var extend = require('utils/extend');

var CommonViewModel = vm.extend({
    _init: function() {
        this.rating = ko.observable();
    },
    star1: function() {
        this.rating(1);
    },
    star2: function() {
        this.rating(2);
    },
    star3: function() {
        this.rating(3);
    },
    star4: function() {
        this.rating(4);
    },
    star5: function() {
        this.rating(5);
    }
});

exports.extend = function(customViewModel) {
    return extend({}, CommonViewModel, customViewModel);
};

exports.create = vm.create;
