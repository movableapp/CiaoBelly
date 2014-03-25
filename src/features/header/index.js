var layoutEngine = require('layout-engine');

exports.start = function() {
    var template = require('./toolbar');
    var viewModel = {};
    layoutEngine.render(template, viewModel, 'header');
};