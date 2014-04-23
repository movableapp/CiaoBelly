
var domify = require('./domify');
var regionHandler = require('./region-handler');

var layout = {
	init: function(config) {
		this.config = config || {};
		this.root = this.config['root'] || document.body;
		this.defaultRegion = this.config['defaultRegion'] || 'main';
		this.regions = {};
		this.handlers = {};
		this.regionHandlers = {};
	},
	start: function() {
		if (this.config.regions) {
			for (var region in this.config.regions) {
				this.initRegion(region, this.config.regions[region].handler, this.config.regions[region].options);
			}
		}
	},
	findRegion: function(region) {
		return this.root.querySelector('#' + region);
	},
	registerHandler: function(name, handler) {
		this.handlers[name] = handler;
	},
	configureRegion: function(region, handlerName, handlerOptions) {
		if (!this.handlers[handlerName]) {
			throw new Error('layoutEngine: you can not set an unregister handler! (' + handlerName + ')');
		}
		this.regionHandlers[region] = {
			handler: handlerName,
			options: handlerOptions || {}
		};
		return true;
	},
	initRegion: function(region, handlerName, handlerOptions) {
		var regionEl = this.findRegion(region);
		if (!regionEl) {
			throw new Error('layoutEngine: you can not initialize a non existing region! (' + region + ')');
		}
		var handlerConstructor = null;
		if (handlerName) {
			handlerConstructor = this.handlers[handlerName];
		} else {
			handlerConstructor = regionHandler;
		}
		// throw error or fallback to regionHandler?
		if (!handlerConstructor) {
			throw new Error('layoutEngine: you can not initialize a region with a non existing handler! (' + handlerName + ')');
		}
		// use "try" because we don't know if given handler fulfill required initialization API!
		var handler = null;
		try {
			handler  = Object.create(handlerConstructor);
			handler.setup(regionEl, handlerOptions);
		} catch(e) {
			throw new Error('layoutEngine: invalid handler! (' + handlerName + ')');
		} finally {
			this.regions[region] = handler;
		}
		return handler;
	},
	getRegionHandler: function(region) {
		if (this.regions[region]) {
			return this.regions[region];
		} else {
			return null;
		}
	},
	render: function(template, viewModel, region, options) {
		region = region || 'main';
		var element = domify(template);
		var handler = this.regions[region];
		if (!handler) {
			var regionHandler = this.regionHandlers[region];
			if (regionHandler) {
				handler = this.initRegion(region, regionHandler.handler, regionHandler.options);
			} else {
				handler = this.initRegion(region, null, options);
			}
		}
		handler.update(element, viewModel, options);
		return {
			el: element
		};
	}
};

module.exports = layout;