
var ViewModel = {
    init: function() {}
};

exports.create = function() {
    var _ = Object.create(ViewModel);
    _.init.apply(_, arguments);
    return _;
};
