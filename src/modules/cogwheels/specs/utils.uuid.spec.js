/*global describe, it, expect, before, beforeEach, after, afterEach */

var uuid = require('utils/uuid');

describe('UUID utility', function () {

	it('should generate a valid UUID version 4', function () {

		expect(uuid()).to.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
	});

	it('should generate unique UUIDs', function () {

		var id1 = uuid();
		var id2 = uuid();
		var id3 = uuid();

		expect(id1).to.not.equal(id2);
		expect(id2).to.not.equal(id3);
		expect(id3).to.not.equal(id1);
	});

});
