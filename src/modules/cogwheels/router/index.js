
var route = require('./route');
var context = require('./context');
var bus = require('../message-bus');

var isExternal = /^http/;

var hashNav = {
	activate: function(config) {
		this.symbol = config.hashNavigationSymbol;
		this.config = config;
		this.firstTime = true;
		window.addEventListener('hashchange', this.onhashchange.bind(this), false);
	},
	deactivate: function() {
		window.removeEventListener('hashchange', this.onhashchange);	
	}, 
	onhashchange: function(e) {
		e = e || {};
		e.newURL = e.newURL || location.hash;
		var i = e.newURL.indexOf(this.symbol);
		var path = e.newURL.substring(i).replace(this.symbol, '');
		var ctx = context.create(path, this.config.base, {});
		return router.dispatch(ctx);
	}, 
	dispatch: function(ctx) {
		if(this.firstTime){
			this.firstTime = false;
			return this.onhashchange();
		}
		window.location.hash = this.symbol + ctx.path;
		return true;
	} 
};

var pushNav = {
	activate: function(config) {
		window.addEventListener('popstate', this.onpopstate, false);	
	},
	deactivate: function() {
		window.removeEventListener('popstate', this.onpopstate);	
	}, 
	onpopstate: function(e) {
		if(e.state){
			router.dispatch(e.state);
		}		
	},
	dispatch: function(ctx) {
		history.pushState(ctx, ctx.title, ctx.pathname);
		return router.dispatch(ctx);
	} 
};

var slaveNav = {
	activate: function(config) {
			
	},
	deactivate: function() {
			
	}, 
	dispatch: function(ctx) {
		return router.dispatch(ctx);
	} 
};


var router = {
	init: function(config) {
//		if(config.disabled){
//			disabler(this);
//			return;
//		}

		this.config = config || {};
		this.configure();

		this.nav = this.createNavigationObject();		
		this.routes = [];
		this.statusHandlers = {};

	},
	createNavigationObject: function() {
		var obj;
		if(this.config.slave){
			obj = slaveNav;
		} else if(this.config.pushStateEnabled) {
			obj = pushNav;
		} else {
			obj = hashNav;
		}
		
		return Object.create(obj);		
	},
	configure: function() {
		this.config.base = this.config.base || '';
		if(this.config.pushStateEnabled == null){
			this.config.pushStateEnabled = true;
		}
		this.config.hashNavigationSymbol = this.config.hashNavigationSymbol || '#';
	},
	start: function() {
		this.nav.activate(this.config);	
		bus.publish('router:started');
		var path = location.pathname + location.search + location.hash;
		this.navigate(path);
	},
	stop: function() {
		this.nav.deactivate();			
	},
	dispose: function() {
		this.stop();
		this.routes = null;
		this.statusHandlers = null;
	},
	on: function(path, fn) {
		if(!this.routes) {
			return;
		}
		var r = route.create(path);
		for(var i = 1, j = arguments.length; i < j; i++) {
			this.routes.push(r.middleware(arguments[i]));
		}
	},
	navigate: function(path) {
		if(isExternal.test(path)) {
			this.navigateExternal(path);
			return;
		}
		bus.publish('router:navigate', { url: path });
		var ctx = context.create(path, this.config.base, {});

		return this.nav.dispatch(ctx);
	},
	dispatch: function(ctx) {
		if(this.routes == null) {
			return;
		}			

		var i = 0;
		var self = this;
		function next() {
			var fn = self.routes[i++];
			if(!fn) {
				ctx.unhandled = true;
				return;
			}
			fn(ctx, next);
		}
		next();
		
		this.checkUnhandled(ctx);
		
		return !ctx.unhandled;
	},
	checkUnhandled: function(ctx) {
		if(ctx.unhandled){
			bus.publish('router:404', ctx);
			if(this.statusHandlers[404]){
				this.statusHandlers[404](ctx);
			}
		}		
	},
	status: function(code, cb) {
		this.statusHandlers[code] = cb;		
	},
	navigateExternal: function(path) {
		bus.publish('router:navigating-external', {url: path});
        bus.publish('system-shutdown', {reason: 'navigating-external', url: path});
        window.location.assign(path);
	}
};

module.exports = router;