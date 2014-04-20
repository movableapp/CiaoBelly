
var createFoodRating = require('../view-models/food').create;
var createSleepRating = require('../view-models/sleep').create;
var createTrainRating = require('../view-models/train').create;

var PageViewModel = {
    init: function() {
        this.food = createFoodRating();
        this.sleep = createSleepRating();
        this.train = createTrainRating();
    }
};

exports.create = function() {
    var instance = Object.create(PageViewModel);
    instance.init();
    return instance;
};
