
var vm = require('vm');

var data = require('data');

var DailyLogsViewModel = vm.extend({
    init: function() {
        this.logs = ko.observableArray(data.log.getAll());
    }
});

exports.create = vm.create.bind(DailyLogsViewModel);
