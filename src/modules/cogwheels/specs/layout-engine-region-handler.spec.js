
var regionHandler = require('layout-engine/region-handler');

// REGION HANDLER SPEC
function createDiv(){
	var node = document.createElement('div');
	node.setAttribute('data-bind', 'text: test');
	return node;
}

describe('default layout region handler', function() {
	var root;
	var vm;
	var node;
	beforeEach(function() {
		root = document.createElement('div');	
		regionHandler.setup(root);
		vm = {
			test: ko.observable()
		};
		node = createDiv();
	});
	afterEach(function() {
		root = null;	
		vm = null;
		regionHandler.root = null;
		regionHandler.previous = null;
	});
	describe('setup', function() {
		it('should store root node', function() {
			expect(regionHandler.root).to.equal(root);
			regionHandler.root = null;
		});
		it('should throw error if root is undefined', function() {
			function t(){ regionHandler.setup(); }
			expect(t).to.throw(Error);
		});
	});
	describe('update', function() {
		it('should databind viewmodel to node', function() {

			regionHandler.update(node, vm);

			vm.test(1337);
			expect(node.textContent).to.equal('1337');
		});
		it('should not bind if option.noBinding is true', function() {
			regionHandler.update(node, vm, { noBinding: true });
			vm.test(1337);
			expect(node.textContent).to.equal('');
		});
		it('should append node to root', function() {
			regionHandler.update(node, vm);	
			vm.test('asdf');
			expect(root.children[0].textContent).to.equal('asdf');
			regionHandler.root = null;
		});
		it('should dispose previous viewmodel', function() {
			var called = false;
			vm.dispose = function() {
				called = true;	
			};

			regionHandler.update(node, vm);
			regionHandler.update(node, {test: ''});
			expect(called).to.be.true; 
		});
		it('should throw error if trying to render document fragments', function() {
			var frag = document.createDocumentFragment();
			var t = function(){ regionHandler.update(frag, null, null); };
			expect(t).to.throw(Error);
		});
	});
	describe('setRoot', function() {

		it('should change the root', function() {
			var root = document.createElement('div');
			regionHandler.setRoot(root);
			expect(regionHandler.root).to.equal(root);
		});

	});
    describe('clearRegion', function() {
        it('should clear a region after a render action', function() {
            var node = document.createElement('div');
            node.innerHTML = 'foo';
            regionHandler.update(node, vm);
            regionHandler.clearRegion();
            expect(regionHandler.root.innerHTML).to.not.contain('foo');
        });
    });
});