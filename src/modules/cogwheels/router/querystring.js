'use strict';

/*
* https://github.com/component/querystring
* License MIT
*
* */
/*
 * Will parse the given querystring into an object such that:
 * ?a=1&b=2   =>  { a:1, b:2 }
 *
 * @param {String} str - querystring
 * @return {Object} queryobject
 * */
exports.parse = function (str) {

	if ('string' != typeof str) {
		return {};
	}
	str = str.trim();
	if (str === '') {
		return {};
	}

	var obj = {};
	var pairs = str.split('&');
	pairs.forEach(function (pair) {
		var parts = pair.split('=');
		/* jshint eqnull: true */
		/* this is NOT to be changed to === */
		obj[parts[0]] = null == parts[1] ? '' : decodeURIComponent(parts[1]);
	});

	return obj;
};

/*
 * will convert an object to a querystring
 *
 * it will encodeURIComponent on key/value pairs
 *
 * @param {Object} object to be turned to a querystring
 * @return {String} querystring
 * */
exports.stringify = function (obj) {

	if (!obj) {
		return '';
	}
	var pairs = [];
	var keys = Object.keys(obj);
	keys.forEach(function (key) {
		pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	});
	return pairs.join('&');
};
