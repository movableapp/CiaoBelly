
var FastClick = require('fastclick');

window.ko.bindingHandlers.fastClick = {
    init: function(element, valueAccessor) {
        FastClick(element);
        return ko.bindingHandlers.click.init.apply(this, arguments);
    }
};
