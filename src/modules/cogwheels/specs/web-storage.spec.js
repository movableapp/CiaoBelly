/*global describe, it, expect, before, beforeEach, after, afterEach*/


'use strict';

var webStorage = require('web-storage');

describe('Web Storage', function () {

	describe('storing and retrieving', function () {


		beforeEach(function () {
			webStorage.init();
		});
		afterEach(function () {
			webStorage.dispose();
		});

		function expectItemRetrieved(strategy) {

			var data = { foo: 'bar' };
			var key = strategy + '-key';

			webStorage.store(strategy, key, data);
			expect(webStorage.retrieve(strategy, key)).to.be.a('object');
			expect(webStorage.retrieve(strategy, key).foo).to.deep.equal(data.foo);
		}

		it('should be possible to store and retrieve with in memory strategy', function () {
			expectItemRetrieved('memory');
		});

		it('should be possible to store and retrieve with in session strategy', function () {
			expectItemRetrieved('session');
		});

		it('should be possible to store and retrieve with in local strategy', function () {
			expectItemRetrieved('local');
		});

		it('should be possible to store and retrieve with in cookie strategy', function () {

			var strategy = 'cookie';
			var data = 'cookie-data';
			var key = 'cookie-key';

			webStorage.store(strategy, key, data);
			expect(webStorage.retrieve(strategy, key)).to.equal(data);

			webStorage.remove(strategy, key); // TODO: remove by dispose method
		});
	});

	describe('removing', function () {

		beforeEach(function () {
			webStorage.dispose();
		});

		function expectItemRemoved(strategy) {

			var data = { foo: 'bar' };
			var key = strategy + '-key';

			webStorage.store(strategy, key, data);
			expect(webStorage.retrieve(strategy, key)).to.exist;
			webStorage.remove(strategy, key);
			expect(webStorage.retrieve(strategy, key)).to.not.exist;
		}

		it('should be possible remove item with in memory strategy', function () {
			expectItemRemoved('memory');
		});

		it('should be possible remove item with in session strategy', function () {
			expectItemRemoved('session');
		});

		it('should be possible remove item with in local strategy', function () {
			expectItemRemoved('local');
		});

		it('should be possible remove item with in cookie strategy', function () {

			var strategy = 'cookie';
			var data = 'cookie-data';
			var key = 'cookie-key';

			webStorage.store(strategy, key, data);
			expect(webStorage.retrieve(strategy, key)).to.exist;
			webStorage.remove(strategy, key);
			expect(webStorage.retrieve(strategy, key)).to.be.false;
		});
	});

	describe('clear', function () {

		function expectCleared(strategy) {

			var data = { foo: 'bar' };

			webStorage.store(strategy, 'one', data);
			webStorage.store(strategy, 'two', data);
			webStorage.store(strategy, 'three', data);

			expect(webStorage.retrieve(strategy, 'one')).to.exist;
			expect(webStorage.retrieve(strategy, 'two')).to.exist;
			expect(webStorage.retrieve(strategy, 'three')).to.exist;

			webStorage.clear(strategy);
			expect(webStorage.retrieve(strategy, 'one')).to.not.exist;
			expect(webStorage.retrieve(strategy, 'two')).to.not.exist;
			expect(webStorage.retrieve(strategy, 'three')).to.not.exist;
		}

		it('should remove all items for memory strategy', function () {
			expectCleared('memory');
		});

		it('should remove all items for session strategy', function () {
			expectCleared('session');
		});

		it('should remove all items for local strategy', function () {
			expectCleared('local');
		});

		it('should remove all items for cookie strategy', function () {

			var strategy = 'cookie';
			var data = 'cookie-data';

			webStorage.store(strategy, 'one', data);
			webStorage.store(strategy, 'two', data);
			webStorage.store(strategy, 'three', data);

			expect(webStorage.retrieve(strategy, 'one')).to.exist;
			expect(webStorage.retrieve(strategy, 'two')).to.exist;
			expect(webStorage.retrieve(strategy, 'three')).to.exist;

			//webStorage.clear(strategy);
			webStorage.remove(strategy, 'one');
			webStorage.remove(strategy, 'two');
			webStorage.remove(strategy, 'three');

			expect(webStorage.retrieve(strategy, 'one')).to.be.false;
			expect(webStorage.retrieve(strategy, 'two')).to.be.false;
			expect(webStorage.retrieve(strategy, 'three')).to.be.false;
		});

		it('should remove all items for all strategies when clearing all', function () {

			var data = { foo: 'bar' };

			webStorage.store('memory', 'one', data);
			webStorage.store('session', 'two', data);
			webStorage.store('local', 'three', data);

			webStorage.clearAll();

			expect(webStorage.retrieve('memory', 'one')).to.not.exist;
			expect(webStorage.retrieve('session', 'two')).to.not.exist;
			expect(webStorage.retrieve('local', 'three')).to.not.exist;
		});
	});

});
