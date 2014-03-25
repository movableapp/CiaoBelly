
var router = require('router');

window.ko.bindingHandlers.navigate = {
    init: function(element, valueAccessor) {

        var target = ko.unwrap(valueAccessor());
        if (target === true || target === undefined) {
            target = element.getAttribute('href');
        }

        element.addEventListener('click', function(evt) {
            evt.preventDefault();
            router.navigate(target);
        }, false);
    }
};
