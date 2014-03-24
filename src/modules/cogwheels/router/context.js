'use strict';

/*
* Based on Context from Page.js
* https://github.com/visionmedia/page.js
* License MIT
* */
var queryParser = require('./querystring');

var context = {
	/*
	 * init - initialize context
	 * @param {string} path - current path to create the context for
	 * @param {string} base - the base path used by the application
	 * @param {Object} state - object to hold state (mostly for history.pushState)
	 * */
	init: function (path, base, state) {

		this.path = path.replace(base, '') || '/';
		this.state = state || {};
		this.state.path = path;
		this.title = document.title;
		this.canonicalPath = path; // including base path
		var i = path.indexOf('?');
		this.querystring = ~i ? path.slice(i + 1) : '';
		this.pathname = ~i ? path.slice(0, i) : path;
		this.params = [];
		this.queryObject = queryParser.parse(this.querystring);
	}
};


/*
 * create - factory method for creating a new route context
 *
 * @param {string} path - current path to create the context for
 * @param {string} base - the base path used by the application
 * @param {Object} state - object to hold state (mostly for history.pushState)
 * @return {Object} context - new created and initialized context object
 * */
exports.create = function (path, base, state) {
	var ctx = Object.create(context);
	ctx.init(path, base, state);
	return ctx;
};
