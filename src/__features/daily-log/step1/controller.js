
var layout = require('layout-engine');

exports.show = function() {
    var vm = require('./view-model');
    var tpl = require('./template.html');
    
    layout.render(tpl, vm);
};