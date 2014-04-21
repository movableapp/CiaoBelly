
var vm = require('vm');

var controller = require('../log/controller');

var ToolbarViewModel = vm.extend({
    save: controller.save.bind(controller)
});

exports.create = vm.create.bind(ToolbarViewModel);
