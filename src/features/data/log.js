
var db = require('./db');

var emptyLog = {
    sleep: null,
    food: null,
    train: null
};

exports.get = function(date) {
    var log = db.get(makeKey(date));
    return log || emptyLog;
};

exports.set = function(date, data) {
    db.set(makeKey(date), data);
};

function makeKey(date) {
    return date.getFullYear() + '' + ("0" + (date.getMonth() + 1)).slice(-2) + '' + ("0" + date.getDate()).slice(-2);
};
