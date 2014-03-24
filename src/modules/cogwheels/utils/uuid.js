
'use strict';

var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

/*!
 * Math.uuid.js (v1.4)
 * http://www.broofa.com
 * mailto:robert@broofa.com
 *
 * Copyright (c) 2010 Robert Kieffer
 * Dual licensed under the MIT and GPL licenses.
 */

/**
 * A more performant, but slightly bulkier, RFC4122v4 solution.
 * We boost performance by minimizing calls to random()
 *
 * @return {string}
 */
module.exports = function () {

	var uuid = new Array(36),
		rnd = 0,
		r, i;

	for (i = 0; i < 36; i++) {
		if (i === 8 || i === 13 || i === 18 || i === 23) {
			uuid[i] = '-';
		}
		else if (i === 14) {
			uuid[i] = '4';
		}
		else {
			if (rnd <= 0x02) {
				rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
			}

			r = rnd & 0xf;
			rnd = rnd >> 4;
			uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
		}
	}

	return uuid.join('');
};
