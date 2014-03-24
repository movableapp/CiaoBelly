'use strict';


module.exports = function (obj) {

	var args = [].slice.call(arguments, 1);

	args.forEach(function (source) {
		if (source) {
			for (var prop in source) {
				obj[prop] = source[prop];
			}
		}
	});

	return obj;
};

