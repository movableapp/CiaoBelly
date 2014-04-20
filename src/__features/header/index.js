var layoutEngine = require('layout-engine');

exports.start = function() {
    var template = require('./toolbar.html');
    var viewModel = {};
    layoutEngine.render(template, viewModel, 'header');
};
