
var layoutEngine = require('layout-engine');
var koTemplate = require('ko-bindings').koTemplate;

exports.init = function() {
    koTemplate.register('add-log/rating', require('./rating.html'));
};

exports.show = function() {
    var template = require('./template.html');
    var viewModel = require('./view-model').create;
    layoutEngine.render(template, viewModel());
};
