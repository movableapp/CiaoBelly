/*global sinon, describe, it, expect, before, after, beforeEach, afterEach*/

'use strict';

var router = require('router');
var querystring = require('router/querystring');
var context = require('router/context');
var pathToRegexp = require('router/path-to-regexp');
var bus = require('message-bus');
var config = {
    slave: true
};
describe('Router', function () {
    before(function () {
    });
    describe('when navigating to "/"', function () {
        beforeEach(function () {
            router.init({slave: true});
        });
        afterEach(function () {
            router.dispose();
        });
        it('should call routes matching "/"', function (done) {
            router.on('/', function () {
                done();
            });
            router.on('/error', function () {
                throw new Error('wrong route called');
            });
            var ctx = context.create('/', '', {});
            router.dispatch(ctx);
        });
        it('should handle add params to context', function () {
            router.on('/test/:a', function (ctx) {
                expect(ctx.params.a).to.equal('1');
            });

            var ctx = context.create('/test/1', '', {});
            router.dispatch(ctx);
        });
        it('should call all routes that match path', function () {
            var times = 0;
            router.on('/test', function (ctx, next) {
                times++;
                next();
            });
            router.on('/test', function () {
                times++;
            });
            var ctx = context.create('/test', '', {});
            router.dispatch(ctx);

            expect(times).to.equal(2);
        });
    });
	describe('using router without initializing', function () {
		it('should just return when calling dispatch', function () {
			var value = router.dispatch({});
			expect(value).to.not.be.defined;
		});

	});

    describe('404', function(){
        beforeEach(function () {
            router.init(config);
        });
        afterEach(function () {
            router.dispose();
        });
        it('should support register error code 404', function(done){
            router.status(404, function(ctx){
				expect(ctx.unhandled).to.be.true;
				done();
            });


            router.dispatch(context.create('/notfound', '', {}));
        });
        it('should return false if no route hits', function() {
            var result = router.dispatch(context.create('/asdasdf', '', {}));
            expect(result).to.be.false;
        });
    });
    describe('navigating to a external url', function () {
        before(function () {
            router.init(config);
        });
        after(function () {
            router.dispose();
        });
        it('should navigate to http://www.google.com', function (done) {
            var url = 'http://www.google.com';

            sinon.stub(router, 'navigateExternal', function (path) {
                expect(path).to.equal(url);
                done();
            });
            router.navigate(url);
			router.navigateExternal.restore();
        });
    });
    describe('ctx should hold query params', function () {
        beforeEach(function () {
            router.init(config);
        });
        afterEach(function () {
            router.dispose();
        });
        it('should parse "/test?a=1&b=2"', function (done) {
            router.on('/test', function (c) {
                expect(c.querystring).to.equal('a=1&b=2');
                expect(c.queryObject).to.deep.equal({a:'1',b:'2'});
                done();
            });
            var ctx = context.create('/test?a=1&b=2', '', {});
            router.dispatch(ctx);

        });
    });
});
//describe('disabling router', function () {
//    beforeEach(function() {
//        router.init({disabled: true});     
//    });
//    afterEach(function() {
//        router.restore();     
//    });
//	it('should not navigate', function () {
//		var failed = false;
//		router.on('/test', function (ctx) {
//			failed = true;
//		});
//		router.navigate('/test');
//		expect(failed).to.be.false;
//	});
//	it('should not dispatch', function () {
//
//		router.on('/test', function (ctx) {
//			throw new Error('should not dispatch');
//		});
//		router.dispatch(context.create('/test', '', {}));
//	});
//	it('should not start', function () {
//		var subscription = bus.subscribe('router:started', function (message) {
//			throw new Error('should not start');
//		});
//		router.start();
//		subscription.dispose();
//	});
//});
describe('querystring parser', function () {
    it('should parse name=tobi&species=ferret to {name: "tobi", species: "ferret"}', function () {
        var result = querystring.parse('name=tobi&species=ferret');
        expect(result.name).to.equal('tobi');
        expect(result.species).to.equal('ferret');
    });
    it('should stringify {name:"tobi", species: "ferret"} to name=tobi&species=ferret', function () {
        var result = querystring.stringify({name: 'tobi', species: 'ferret'});
        expect(result).to.equal('name=tobi&species=ferret');
    });
    it('parse returns empty object if argument is not a string', function() {
        var result = querystring.parse({});
        expect(result).to.be.empty;
    });
    it('parse returns empty object if argument is empty string', function() {
        expect(querystring.parse('')).to.be.empty;
    });
    it('parse should return empty string if key-value pair is missing value', function() {
        var result = querystring.parse('key');
        expect(result.key).to.equal('');
    });
    it('stringify should return empty string when argument is not defined', function() {
        expect(querystring.stringify(null)).to.equal('');
    });
});
describe('hashchange navigation', function () {

    beforeEach(function () {
        router.init({pushStateEnabled: false});
    });
    afterEach(function () {
        router.dispose();
    });
    it('should react to hashchange', function (done) {

        router.on('/abc', function (ctx) {
            done();
            router.stop();
        });
        router.start();
        router.navigate('/abc');

    });
});

describe('utils:url', function(){

    var url = require('utils/url');
    it('should parse http://localhost/foo?ferret=toby', function(){
        var obj = url.parse('http://localhost/foo?ferret=toby');
        expect(obj.querystring).to.equal('ferret=toby');
        expect(obj.path).to.equal('/foo');
        expect(obj.scheme).to.equal('http');
        expect(obj.domain).to.equal('localhost');
    });

    it('should parse invalid input to undefined', function() {
        var obj = url.parse('asdfasdf');
        expect(obj.scheme).to.be.undefined;
        expect(obj['user_info']).to.be.undefined;
        expect(obj.domain).to.be.undefined;
        expect(obj.port).to.be.undefined;
        expect(obj.path).to.equal('asdfasdf');
        expect(obj.querystring).to.be.undefined;
        expect(obj.fragment).to.be.undefined;
    });
});
describe('middleware', function() {
	before(function () {
		router.init(config);
	});
	after(function () {
		router.dispose();
	});
    it('should dispatch middleware', function(done) {

        var incOne = function(ctx, next){
            if(!ctx.test) {
                ctx.test = 0;
            }
            ctx.test += 1;
            next();
        };

        router.on('/test', incOne, function(ctx){
            expect(ctx.test).to.equal(1);
            done();
        });

        router.on('/test2', incOne, incOne, function(ctx){
            expect(ctx.test).to.equal(2);

        });
        router.navigate('/test2');
        router.navigate('/test');   
    });
	it('should handle routes like "/user/:id/edit"', function (done) {
		function load(ctx, next){
			ctx.user = {id: ctx.params.id};
			next();
		}
		function edit(ctx){
			expect(ctx.user.id).to.equal('1');
			done();
		}

		router.on('/user/:id/edit', load, edit);
		router.navigate('/user/1/edit');
	});
    describe('path-to-regexp', function() {
        it('should just return regexp if given as input', function() {
            var result = pathToRegexp(/test/);
            expect(result.source).to.equal('test');          
        });
        it('should join arguments with | when passed and array', function() {
            var result = pathToRegexp(['a', 'b']);
            expect(result.source).to.equal('^(a|b)\\/?$');
        });
        it('should not ignore case if options.sensitive', function() {
            var result = pathToRegexp('a', null, {sensitive: true});
            expect(result.source).to.equal('^a\\/?$');
            expect(result.ignoreCase).to.be.false; 
        });
        it('should not append /? in strict mode', function() {
            var result = pathToRegexp('a', null, {strict: true});
            expect(result.source).to.equal('^a$');
        });
        it('should create capture group of id in /user/:id', function() {
            var keys = [];
            var result = pathToRegexp('/user/:id', keys);
            expect(result.source).to.equal('^\\/user\\/(?:([^\\/]+?))\\/?$');
            expect(keys[0]).to.deep.equal({ name: 'id', optional: false });
        });
    });
});
describe('context', function () {
	it('can be created without state', function () {
		var ctx = context.create('/test', '');
		expect(ctx.state).to.deep.equal({path:'/test'});
	});
	it('can be created without base url', function () {
		var ctx = context.create('/test', null);
		expect(ctx.path).to.equal('/test');
	});
	it('can be create with base', function () {
		var ctx = context.create('http://localhost/test', 'http://localhost');

		expect(ctx.path).to.equal('/test');
	});
	it('should replace empty path with slash', function () {
		var ctx = context.create('');
		expect(ctx.path).to.equal('/');
	});
});
/* screws with test runners
describe('popstate', function () {
	beforeEach(function () {
		router.init({pushStateEnabled: true});
	});
	afterEach(function () {
		router.dispose();
	});
	it('should support pushstate navigation', function (done) {
		var count = 0;
		router.on('/test/:a', function (ctx) {
			count++;
		});

		router.navigate('/test/1');
		router.navigate('/test/2');

		window.history.back();
		setTimeout(function () {

			expect(location.href).to.contain('test/1');
//			expect(count).to.equal(3);
			done();
		},5);
	});
});
*/