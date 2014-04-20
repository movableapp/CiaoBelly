
var router = require('router');

var toolbar = require('./toolbar/controller');

exports.init = function() {
    router.on('/', toolbar.show.bind(toolbar));
};
