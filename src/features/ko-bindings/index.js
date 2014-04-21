
exports.init = function() {
    require('./navigate');
    require('./text-date');
};

exports.koTemplate = require('./ko-template');
exports.koTemplate.init();