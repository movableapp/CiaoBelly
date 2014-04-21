
var layoutEngine = require('layout-engine');

exports.show = function() {
    var template = require('./template.html');
    var viewModel = require('./view-model');
    layoutEngine.render(template, viewModel.create(), 'header');
};
