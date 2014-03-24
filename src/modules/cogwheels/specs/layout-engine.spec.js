/* global sinon */
var layout = require('layout-engine');
var regionHandler = require('layout-engine/region-handler');


describe('layout-engine', function() {

	describe('lifecycle', function() {

		describe('init', function() {

			it('should set root to body by default', function() {
				layout.init({});
				expect(layout.root).to.equal(document.body);
			});

			it('should set root to the config.root is supplied', function() {
				var el = document.createElement('div');
				layout.init({ root: el });
				expect(layout.root).to.equal(el);
			});

			it('should set a default "defaultRegion" property named "main"', function() {
				layout.init({});
				expect(layout.defaultRegion).to.equal('main');
			});

			it('should set a supplied "defaultRegion" property', function() {
				layout.init({ defaultRegion: 'foo' });
				expect(layout.defaultRegion).to.equal('foo');
			});

			it('should store given configuration', function() {
				var config = { foo: 'foo' };
				layout.init(config);
				expect(layout.config).to.deep.equal(config);
			});

		});

		describe('start', function() {

			it('should initialize configured regions', function() {
				var total = 0;



				var mainEl = document.createElement('div');
				mainEl.id = 'main';
				var reg2El = document.createElement('div');
				reg2El.id = 'reg2';
				var rootEl = document.createElement('div');
				rootEl.appendChild(mainEl);
				rootEl.appendChild(reg2El);

				layout.init({
					root: rootEl,
					regions: {
						main: {
							handler: 'fooHandler',
							options: {
								foo: 1
							}
						},
						reg2: {
							handler: 'faaHandler',
							options: {
								faa: 2
							}
						}
					}
				});

				layout.registerHandler('fooHandler', {
					setup: function(root, options) {
						total += options.foo;
					},
					update: function() {}
				});
				layout.registerHandler('faaHandler', {
					setup: function(root, options) {
						total += options.faa;
					},
					update: function() {}
				});

				layout.start();
				expect(total).to.equal(3);
			});

		});

		describe('dispose', function() {

			it.skip('should dispose regions or viewmodels?', function() {


			});

		});
	});

	describe('findRegion', function() {

		beforeEach(function() {
			layout.init({
				root: document.createElement('div')
			});
		});

		it('should return an element when a region exists', function() {
			var regionEl = document.createElement('div');
			regionEl.id = 'foo';
			layout.root.appendChild(regionEl);
			expect(layout.findRegion('foo')).to.equal(regionEl);
		});

		it('should return "undefined" if region does not exists', function() {
			expect(layout.findRegion('foo')).to.be.null;
		});

	});

	describe('registerHandler', function() {

		beforeEach(function() {
			layout.init({});
		});

		it('should register a new handler', function() {
			layout.registerHandler('foo', {});
			expect(layout.handlers).to.have.property('foo');
		});

	});

	describe('configureRegion', function() {

		beforeEach(function() {
			layout.init({});
			layout.registerHandler('fooHandler', {});
		});

		it('should register an existing handler', function() {
			expect(
				layout.configureRegion('fooRegion', 'fooHandler', {})
			).to.be.true;
		});

		it('should register an existing handler without options', function() {
			layout.configureRegion('fooRegion', 'fooHandler');
			expect(layout.regionHandlers['fooRegion'].options).to.deep.equal({});
		});

		it('should throw exception is the handler is not registered', function() {
			expect(function() {
				layout.configureRegion('fooRegion', 'xxxHandler', {});
			}).to.throw(/layoutEngine: you can not set an unregister handler!/);
		});

		it('should set options for the handler', function() {
			layout.configureRegion('fooRegion', 'fooHandler', { foo: 'foo' });
			expect(layout.regionHandlers['fooRegion'].options).to.have.property('foo');
		});

	});

	describe('initRegion', function() {

		var regionEl = null;

		beforeEach(function() {
			regionEl = document.createElement('div');
			regionEl.id = 'fooRegion';

			var layoutRoot = document.createElement('div');
			layoutRoot.appendChild(regionEl);

			layout.init({ root: layoutRoot });
			layout.registerHandler('fooHandler', {
				setup: function() {},
				update: function() {}
			});
		});

		it('should initialize a region', function() {
			var handler = layout.initRegion('fooRegion', 'fooHandler');
			expect(layout.handlers['fooHandler'].isPrototypeOf(handler)).to.be.true;
		});

		it('should setup the region handler with given options', function(done) {
			layout.registerHandler('customHandler', {
				setup: function(root, options) {
					expect(options).to.have.property('id');
					done();
				}
			});
			layout.initRegion('fooRegion', 'customHandler', { id: 'foo' });
		});

		it('should initialize with the default handler if no explicit handler was given', function(done) {
			var stub = sinon.stub(regionHandler, 'setup', function() {
				stub.restore();
				done();
			});
			layout.initRegion('fooRegion');
		});

		it('should add an initialized handlers to the "layout.regions" collection', function() {
			layout.initRegion('fooRegion');
			expect(layout.regions).to.have.property('fooRegion');
		});

		it('should throw an error if region does not exists', function() {
			expect(function() {
				layout.initRegion('xxxRegion', 'fooHandler');
			}).to.throw(/layoutEngine: you can not initialize a non existing region!/);
		});

		it('should throw an error if handler does not exists', function() {
			expect(function() {
				layout.initRegion('fooRegion', 'xxxHandler');
			}).to.throw(/layoutEngine: you can not initialize a region with a non existing handler!/);
		});

		it('should throw an error if handler does not expose a setup method', function() {
			layout.registerHandler('xxxHandler', {});
			expect(function() {
				layout.initRegion('fooRegion', 'xxxHandler');
			}).to.throw(/layoutEngine: invalid handler!/);
		});

	});

	describe('getRegionHandler', function() {

		beforeEach(function() {
			var regionEl = document.createElement('div');
			regionEl.id = 'foo';

			var rootEl = document.createElement('div');
			rootEl.appendChild(regionEl);

			layout.init({root: rootEl});
		});

		it('should the handler of an initialized region', function() {
			layout.initRegion('foo');
			expect(layout.getRegionHandler('foo')).to.equal(layout.regions['foo']);
		});

		it('should return false for a non existing / non initialized region', function() {
			expect(layout.getRegionHandler('foo')).to.be.null;
		});

	});

	describe('render', function() {

		var mainRegionEl = null;

		beforeEach(function() {
			mainRegionEl = document.createElement('div');
			mainRegionEl.id = 'main';
			var layoutRoot = document.createElement('div');
			layoutRoot.appendChild(mainRegionEl);
			layout.init({ root: layoutRoot });
		});

		it('should return a "render action" object with domified element', function() {
			layout.initRegion('main');
			var result = layout.render('<p>test</p>', {}, 'main');
			expect(result.el).to.be.instanceof(HTMLElement);
		});

		it('should render to the default region', function() {
			layout.render('<p>test</p>');
			expect(mainRegionEl.innerHTML).to.contain('test');
		});

		it('should call handler\'s update' , function(done) {
			var stub = sinon.stub(regionHandler, 'update', function(node) {
				stub.restore();
				expect(node.innerHTML).to.contain('test');
				done();
			});
			layout.initRegion('main');
			layout.render('<p>test</p>', {}, 'main');
		});

		it('should self initialize an inactive region with default region handler', function(done) {
			var stub = sinon.stub(regionHandler, 'setup', function(root, options) {
				stub.restore();
				expect(options).to.have.property('foo');
				done();
			});
			layout.render('<p>test</p>', {}, 'main', { foo: 'foo' });
		});

		it('should self initialize an inactive region with a custom region handler', function(done) {
			layout.registerHandler('fooHandler', {
				setup: function(root, options) {
					expect(options).to.have.property('foo');
					done();
				},
				update: function() {}
			});
			layout.configureRegion('main', 'fooHandler', { foo: 'foo' });
			layout.render('<p>test</p>', {}, 'main');
		});

	});



//	describe('Disable layout-engine', function() {
//		it('should generate a fake when disabled', function() {
//			var engine = layout;
//			engine.init({disabled: true});
//			expect(engine.start()).to.be.false;
//			engine.restore();
//
//			expect(engine.start()).to.be.undefined;
//		});
//
//	});

});

