
var layoutEngine = require('layout-engine');
var koTemplate = require('ko-bindings').koTemplate;

var template = require('./template.html');
var viewModel = require('./view-model');

exports.init = function() {
    koTemplate.register('add-log/rating-choose', require('./rating-choose.html'));
    koTemplate.register('add-log/rating-show', require('./rating-show.html'));
};

exports.show = function() {
    this.viewModel = viewModel.create();
    layoutEngine.render(template, this.viewModel);
};

/**
 * just update a local memory of the selected values
 * for the current date.
 *
 * the log still editable
 */
exports.cache = function() {
    this.viewModel.cacheLog();
};

/**
 * register the log, apply values to tag, do all calculations...
 *
 * after this operation the log is not editable anymore.
 */
exports.save = function() {
    if (!this.viewModel.saveLog()) {
        alert('you DailyLog seems to not be complete!');
    }
};
