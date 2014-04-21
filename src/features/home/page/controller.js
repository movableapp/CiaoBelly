

var layoutEngine = require('layout-engine');
var template = require('./template.html');
var viewModel = require('./view-model');

exports.show = function() {
    layoutEngine.render(template, viewModel.create());
};

