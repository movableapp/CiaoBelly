
var regionHandler = {
	setup: function(root, options) {
		if(!root) { throw new Error('missing root'); }
		this.setRoot(root);
	},
	update: function(node, viewmodel, options) {
		var opt = options || {};
		if(node.nodeType === 11) {
			throw new Error('Document fragments are not allowed!\nIf you are trying to render a template, make sure it has only one root node!');
		}		
		if(opt.noBinding) { return; }
		this.clearRegion();
		ko.applyBindings(viewmodel, node);
		this.root.appendChild(node);

		this.previous = {model: viewmodel, view: node};
	},
	clearRegion: function() {
		if(this.previous){
			ko.removeNode(this.previous.view);
			if(this.previous.model && this.previous.model.dispose) {
				this.previous.model.dispose();
			}
            this.previous = null;
		}
	},
	setRoot: function(root) {
		this.root = root;
	}
};

module.exports = regionHandler;