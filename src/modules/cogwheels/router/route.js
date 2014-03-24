'use strict';

/*
* Mostly based on
* https://github.com/component/route
* License MIT
* */

var pathToRegexp = require('./path-to-regexp');
/*
 * a route represents a url pattern and a matching callback
 * used by the router to dispatch incoming routes
 * */
var route = {
	/*
	 * initialize the route with a path pattern, have a look at path-to-regexp for further info
	 *
	 * @param {String} path this is the path pattern send to path-to-regexp
	 * @param {Function} callback
	 * */
	init: function (path, callback) {
		this.path = path;
		this.keys = [];
		this.regexp = pathToRegexp(this.path, this.keys);
		this.callback = callback;

	},
	middleware: function (fn) {
		var self = this;
		return function (ctx, next) {
			if (self.match(ctx.path, ctx.params)) {
				return fn(ctx, next);
			}
			next();
		};
	},
	match: function (path, params) {
		var qsIndex = path.indexOf('?');
		var pathname = ~qsIndex ? path.slice(0, qsIndex) : path;
		var m = this.regexp.exec(pathname);
		var keys = this.keys;
		var args = [];

		if (!m) {
			return false;
		}
		for (var i = 1, len = m.length; i < len; ++i) {
			var key = keys[i - 1];

			/* jshint laxbreak: true */
			var val = ('string' == typeof m[i]
				? decodeURIComponent(m[i])
				: m[i]);

			if (key) {
				params[key.name] = (undefined !== params[key.name]
					? params[key.name]
					: val);
			} else {
				params.push(val);
			}

			args.push(val);
		}

		params.args = args;
		return true;
	}
};
exports.create = function (path, callback) {
	var r = Object.create(route);
	r.init(path, callback);
	return r;
};

