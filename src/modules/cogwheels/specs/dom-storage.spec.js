/*global describe, it, expect, before, beforeEach, after*/


'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////////////
var domStorage = require('web-storage/dom-storage');

////////////////////////////////////////////////////////////////////////////////////////////////////
// SPECS
////////////////////////////////////////////////////////////////////////////////////////////////////

describe('DOM Storage', function () {
	describe('session storage', function () {
		var storage = domStorage.session;
		beforeEach(function () {
			storage.clear();
		});
		describe('set and get (implicit)', function () {

			var data = {
				year: 1966,
				information: {seasons: 3, episodes: 80, runningTime: 50},
				cast: ['William Shatner', 'Leonard Nimroy', 'DeForest Kelley'],
				name: 'Star Trek: The Original Series', running: false, misc: null
			};

			it('should be able to store objects with different types (number)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').year).to.a('number');
				expect(storage.get('myData').year).to.equal(data.year);
			});
			it('should be able to store objects with different types (object)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').information).to.a('object');
				expect(storage.get('myData').information).to.deep.equal(data.information);
			});
			it('should be able to store objects with different types (array)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').cast).to.be.an('array');
				expect(storage.get('myData').cast).to.deep.equal(data.cast);
			});
			it('should be able to store objects with different types (string)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').name).to.a('string');
				expect(storage.get('myData').name).to.equal(data.name);
			});

			it('should be able to store objects with different types (boolean)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').running).to.be.a('boolean');
				expect(storage.get('myData').running).to.equal(data.running);
			});
			it('should be able to store objects with different types (null)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').misc).to.null;
				expect(storage.get('myData').misc).to.equal(data.misc);
			});

		});

		describe('removing item', function () {
			it('remove stored item', function () {
				storage.set('hello', {foo: 'bar'});
				expect(storage.get('hello')).to.exist;
				storage.remove('hello');
				expect(storage.get('hello')).to.not.exist;
			});
		});

		describe('clearing storage', function () {


			it('should remove all items', function () {
				var data = {foo: 'bar'};
				storage.set('one', data);
				storage.set('two', data);
				storage.set('three', data);
				storage.clear();
				expect(storage.get('one')).to.not.exist;
				expect(storage.get('two')).to.not.exist;
				expect(storage.get('three')).to.not.exist;
				expect(sessionStorage.length).to.equal(0);

			});
		});
	});

	describe('local storage', function () {
		var storage = domStorage.session;
		beforeEach(function () {
			storage.clear();
		});
		describe('set and get (implicit)', function () {
			var data = {
				year: 1966,
				information: {
					seasons: 3,
					episodes: 80,
					runningTime: 50
				},
				cast: ['William Shatner', 'Leonard Nimroy', 'DeForest Kelley'],
				name: 'Star Trek: The Original Series',
				running: false,
				misc: null
			};


			it('should be able to store objects with different types (number)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').year).to.a('number');
				expect(storage.get('myData').year).to.equal(data.year);
			});
			it('should be able to store objects with different types (object)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').information).to.a('object');
				expect(storage.get('myData').information).to.deep.equal(data.information);
			});
			it('should be able to store objects with different types (array)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').cast).to.be.an('array');
				expect(storage.get('myData').cast).to.deep.equal(data.cast);
			});
			it('should be able to store objects with different types (string)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').name).to.a('string');
				expect(storage.get('myData').name).to.equal(data.name);
			});

			it('should be able to store objects with different types (boolean)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').running).to.be.a('boolean');
				expect(storage.get('myData').running).to.equal(data.running);
			});
			it('should be able to store objects with different types (null)', function () {
				storage.set('myData', data);
				expect(storage.get('myData').misc).to.null;
				expect(storage.get('myData').misc).to.equal(data.misc);
			});
			it('should return undefined when no data is found', function() {
				expect(storage.get('nodata')).to.be.undefined;

			});

		});

		describe('removing item', function () {
			it('remove stored item', function () {
				storage.set('hello', {foo: 'bar'});
				expect(storage.get('hello')).to.exist;
				storage.remove('hello');
				expect(storage.get('hello')).to.not.exist;
			});
		});

		describe('clearing storage', function () {


			it('should remove all items', function () {
				var data = {foo: 'bar'};
				storage.set('one', data);
				storage.set('two', data);
				storage.set('three', data);
				storage.clear();
				expect(storage.get('one')).to.not.exist;
				expect(storage.get('two')).to.not.exist;
				expect(storage.get('three')).to.not.exist;
				expect(sessionStorage.length).to.equal(0);

			});
		});
		describe('storage.supported', function() {
			it('should return true if storage is supported', function() {
				var storage = domStorage.session;
				expect(storage.supported()).to.be.true;
			});
		});
	});
});


