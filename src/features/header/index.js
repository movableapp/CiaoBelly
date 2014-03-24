var layoutEngine = require('layout-engine');

exports.start = function() {
    var template = require('./template');
    var viewModel = {};
    layoutEngine.render(template, viewModel, 'header');
};