
exports.init = function() {
    require('./navigate');
    require('./text-date');
    require('./fast-click');
};

exports.koTemplate = require('./ko-template');
exports.koTemplate.init();