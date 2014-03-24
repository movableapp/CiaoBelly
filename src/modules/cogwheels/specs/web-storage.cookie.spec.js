/*global describe, it, expect, before, beforeEach, after, afterEach */

var cookie = require('web-storage/cookie');

describe('Cookie utility', function () {

	beforeEach(function () {

		cookie.set('cookie1', 'chocolate');
		cookie.set('cookie2', 'vanilla');
	});

	afterEach(function () {

		cookie.remove('cookie1');
		cookie.remove('cookie2');
	});

	it('should not return any value for non-existing cookies', function () {

		expect(cookie.get('cookie3')).to.equal.false;
	});

	it('should return the same value that have been set', function () {

		expect(cookie.get('cookie1')).to.equal('chocolate');
	});

	it('should not return any value for removed cookies', function () {

		cookie.remove('cookie1');

		expect(cookie.get('cookie1')).to.equal.false;
	});

	it('should not return a value for an expired cookie', function (done) {

		cookie.set('cookie3', 'eaten', new Date(Date.now() + 1));

		setTimeout(function () {
			expect(cookie.get('cookie3')).to.equal.false;
			done();
		}, 2);
	});

	it('should not be able to get the value of a secure cookie', function () {

		cookie.set('cookie3', 'secret', null, true);

		expect(cookie.get('cookie3')).to.equal.false;
	});

});
