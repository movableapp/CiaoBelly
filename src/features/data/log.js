
var extend = require('utils/extend');
var db = require('./db');

var emptyLog = {
    sleep: null,
    food: null,
    train: null,
    saved: false
};

exports.get = function(date) {
    var log = db.get(makeKey(date)) || {};
    return extend({}, emptyLog, log);
};

exports.set = function(date, data) {
    var key = makeKey(date);
    db.set(key, data);
    pushKey(key);
};

exports.isValid = function(date) {
    var log = this.get(date);
    return this.dataIsValid(log);
};

exports.dataIsValid = function(log) {
    return (
        log.sleep !== null &&
        log.food !== null &&
        log.train !== null
    );
};

exports.save = function(date) {
    var log = this.get(date);
    if (this.dataIsValid(log)) {
        log.saved = true;
        this.set(date, log);
        return true;
    } else {
        return false;
    }
};

function makeKey(date) {
    return 'daily' + date.getFullYear() + '' + ("0" + (date.getMonth() + 1)).slice(-2) + '' + ("0" + date.getDate()).slice(-2);
}

function pushKey(key) {
    var keys = db.get('dailies') || [];
    if (!~keys.indexOf(key)) {
        keys.push(key);
    }
    db.set('dailies', keys);
//    console.log(db.get('dailies'));
}
