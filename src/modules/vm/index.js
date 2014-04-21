
/**
 * Abstract Knockout View Model
 *
 * the purpose of this component is to reduce the amount of repeating code
 * in view models definition files
 *
 * // custom view-model.js example:
 * var vm = require('vm');
 * var CustomViewModel = vm.extend({ ... });
 * exports.create = vm.create.bind(CustomViewModel);
 *
 */

var extend = require('utils/extend');

var ViewModel = {
    init: function() {},
    dispose: function() {}
};

exports.extend = function(viewModel) {
    return extend({}, ViewModel, viewModel);
};

exports.create = function() {
    var instance = Object.create(this);
    instance.init.apply(instance, arguments);
    return instance;
};
