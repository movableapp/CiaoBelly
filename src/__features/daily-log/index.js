
var router = require('router');

exports.controllers = [
    require('./step1/controller')
];

exports.start = function() {
    
    router.on('dailyLog', this.controllers[0].show);

};