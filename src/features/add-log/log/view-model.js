
var createFoodRating = require('../view-models/food').create;
var createSleepRating = require('../view-models/sleep').create;
var createTrainRating = require('../view-models/train').create;

var LogViewModel = {
    init: function() {
        this.food = createFoodRating();
        this.sleep = createSleepRating();
        this.train = createTrainRating();
        this.date = ko.observable(new Date());
    },
    dateBack: function() {
        var date = this.date();
        date.setDate(date.getDate() - 1);
        this.date(date);
    },
    dateForward: function() {
        var date = this.date();
        date.setDate(date.getDate() + 1);
        this.date(date);
    }
};

exports.create = function() {
    var instance = Object.create(LogViewModel);
    instance.init();
    return instance;
};
