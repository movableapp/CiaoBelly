
var layoutEngine = require('layout-engine');


exports.show = function() {
    var template = require('./template.html');
    var viewModel = require('./view-model');
    
    this.viewModel = viewModel.create();
    layoutEngine.render(template, this.viewModel, 'header');
};

exports.enableSaveBtn = function(enabled) {
    this.viewModel.saveBtnStatus(enabled);
};
