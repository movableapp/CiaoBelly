'use strict';

/**
 * Returns cookie value by key, or false if not found.
 */
exports.get = function (key) {

	var cookies = document.cookie.split(/;\s*/);
	var encodedKey = encodeURIComponent(key);
	var pair;

	for (var i = 0; i < cookies.length; i++) {
		pair = cookies[i].split('=');

		if (pair[0] === encodedKey) {
			return decodeURIComponent(pair[1]);
		}
	}

	return false;
};

/**
 * Set cookie value by key.
 */
exports.set = function (key, value, expireDate, secure) {

	var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);

	if (expireDate) {
		cookie += '; expires=' + expireDate.toUTCString();
	}

	if (secure) {
		cookie += '; secure';
	}

	document.cookie = cookie;
};

/**
 * Remove cookie value by key.
 */
exports.remove = function (key) {

	var expireDate = new Date(Date.now() - 1000);

	document.cookie = encodeURIComponent(key) + '=; expires=' + expireDate.toUTCString();
};
