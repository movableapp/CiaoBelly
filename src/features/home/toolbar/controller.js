
var layoutEngine = require('layout-engine');
var template = require('./template.html');

exports.start = function() {
    console.log('init home toolbar');
    layoutEngine.render(template, {}, 'header');
};

