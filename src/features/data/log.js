
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

exports.save = function(date) {
    var log = this.get(date);
    if (isValid(log)) {
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

function isValid(log) {
    return (
        log.sleep !== null &&
        log.food !== null &&
        log.train !== null
    );
}
