
var data = require('data');

var createFoodRating = require('../view-models/food').create;
var createSleepRating = require('../view-models/sleep').create;
var createTrainRating = require('../view-models/train').create;

var LogViewModel = {
    init: function() {
        
        this.food = createFoodRating();
        this.sleep = createSleepRating();
        this.train = createTrainRating();
        
        this.date = ko.observable();
        this.date.subscribe(this.loadLog, this);
        this.date(new Date());
    },
    dateBack: function() {
        var date = this.date();
        date.setDate(date.getDate() - 1);
        this.date(date);
    },
    dateForward: function() {
        var date = this.date();
        
        // prevent future dates!
        if (data.datesAreEqual(date, new Date())) {
            return;
        }
        
        date.setDate(date.getDate() + 1);
        this.date(date);
    },
    loadLog: function() {
        var log = data.log.get(this.date());
        this.food.resetRating(log.food);
        this.sleep.resetRating(log.sleep);
        this.train.resetRating(log.train);
    },
    cacheLog: function() {
        data.log.set(this.date(), {
            food: this.food.rating() || null,
            sleep: this.sleep.rating() || null,
            train: this.train.rating() || null
        });
    },
    saveLog: function() {}
};

exports.create = function() {
    var instance = Object.create(LogViewModel);
    instance.init();
    return instance;
};
