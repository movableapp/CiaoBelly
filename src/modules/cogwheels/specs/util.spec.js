/*global describe, it, expect, before, beforeEach, after*/

'use strict';

var extend = require('utils/extend');

describe('Utility', function () {


	describe("extend", function () {

		it("should return object extended with properties from the passed objects", function () {

			var obj = { lol: 'lol' };

			expect(extend(obj, {foo: 'bar'}))
				.to.deep.equal({
					foo: 'bar',
					lol: 'lol'
				});


		});
        it('should support extending multiple objects', function () {

            var obj = { lol: 'lol' };
            expect(extend(obj, {lorem: 'ipsum'}, null, {a: 'a'}))
                .to.deep.equal({
                    lol: 'lol',
                    lorem: 'ipsum',
                    a: 'a'
                });
        });
		it("should return an object with all properties from the merged objects", function () {

			var obja = {
				s: "s",
				n: 1,
				o: {
					oo: {},
					not: true
				}
			};

			var objb = {
				n: 2,
				o: {
					foo: 'bar'
				}
			};

			expect(extend(obja, objb))
				.to.deep.equal({
					s: 's',
					n: 2,
					o: {
						foo: 'bar'
					}
				});

		});
	});


});
