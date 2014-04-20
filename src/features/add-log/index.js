
var router = require('router');

var toolbar = require('./toolbar/controller');
var page = require('./page/controller');

exports.init = function() {
    router.on('/add-log', function() {
        toolbar.show();
        page.show();
    });
};
