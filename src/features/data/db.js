
var storage = require('web-storage');

var strategy = 'memory';

exports.set = function(key, val) {
//    console.log('set', key, val);
    return storage.store(strategy, key, val);
};

exports.get = function(key) {
    var value = storage.retrieve(strategy, key);
//    console.log('get', key, value);
    return value;
};
