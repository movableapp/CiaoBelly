
var data = require('data');

var createFoodRating = require('../view-models/food').create;
var createSleepRating = require('../view-models/sleep').create;
var createTrainRating = require('../view-models/train').create;

var toolbar = require('../toolbar/controller');

var LogViewModel = {
    init: function() {
        
        this.food = createFoodRating();
        this.sleep = createSleepRating();
        this.train = createTrainRating();
        this.isSaved = ko.observable();
        
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
        this.isSaved(log.saved);
        this.updateSaveBtn(log);
    },
    cacheLog: function() {
        var log = {
            food: this.food.rating() || null,
            sleep: this.sleep.rating() || null,
            train: this.train.rating() || null
        };
        data.log.set(this.date(), log);
        this.updateSaveBtn(log);
    },
    saveLog: function() {
        var result = data.log.save(this.date());
        this.loadLog();
        return result;
    },
    updateSaveBtn: function(log) {
        if (log.saved) {
            toolbar.enableSaveBtn(false);
        } else {
            toolbar.enableSaveBtn(data.log.dataIsValid(log));
        }
    }
};


exports.create = function() {
    var instance = Object.create(LogViewModel);
    instance.init();
    return instance;
};
