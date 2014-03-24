'use strict';
/* implemented with regex from http://www.ietf.org/rfc/rfc3986.txt */
var splitRegExp = new RegExp(
	'^' +
		'(?:' +
		'([^:/?#.]+)' +                         // scheme - ignore special characters
		// used by other URL parts such as :,
		// ?, /, #, and .
		':)?' +
		'(?://' +
		'(?:([^/?#]*)@)?' +                     // userInfo
		'([\\w\\d\\-\\u0100-\\uffff.%]*)' +     // domain - restrict to letters,
		// digits, dashes, dots, percent
		// escapes, and unicode characters.
		'(?::([0-9]+))?' +                      // port
		')?' +
		'([^?#]+)?' +                           // path
		'(?:\\?([^#]*))?' +                     // query
		'(?:#(.*))?' +                          // fragment
		'$');

exports.parse = function (uri) {
	var split;
	split = uri.match(splitRegExp);
	return {
		'scheme': split[1],
		'user_info': split[2],
		'domain': split[3],
		'port': split[4],
		'path': split[5],
		'querystring': split[6],
		'fragment': split[7]
	};
};