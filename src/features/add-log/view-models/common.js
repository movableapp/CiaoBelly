
var vm = require('vm');
var extend = require('utils/extend');
var logController = require('../log/controller');

var CommonViewModel = vm.extend({
    _init: function() {
        this.rating = ko.observable();
    },
    resetRating: function(value) {
        if (value >= 1 && value <= 5) {
            this.rating(value);
            return true;
        } else {
            this.rating(0);
            return false;
        }
    },
    star1: function() {
        this.rating(1);
        logController.cache();
    },
    star2: function() {
        this.rating(2);
        logController.cache();
    },
    star3: function() {
        this.rating(3);
        logController.cache();
    },
    star4: function() {
        this.rating(4);
        logController.cache();
    },
    star5: function() {
        this.rating(5);
        logController.cache();
    }
});

exports.extend = function(customViewModel) {
    return extend({}, CommonViewModel, customViewModel);
};

exports.create = vm.create;
