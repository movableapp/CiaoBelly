/**
 * Web storage component.
 *
 * Manages persistence storage of data through different strategies.
 * Implementation of storage strategies provided in other components.
 * Possible to register custom strategy.
 *
 * Configured with the following default strategies:
 * - memory -> In memory, data will be lost on page refresh.
 * - session -> DOM session storage
 * - local -> DOM local storage
 * - cookie -> Cookie storage
 */

'use strict';

/*
 * TODO
 * look into default strategy...
 * Error handling
 * */

var domStorage = require('./dom-storage');
var cookie = require('./cookie');

/**
 * Default Storage strategies.
 */
var strategies = {

	/**
	 * In memory storage strategy, implemented in place.
	 */
	memory: {
		retrieve: function (key) {
			return this.storage && this.storage[key];
		},
		store: function (key, value) {
			if (!this.storage) {
				this.storage = {};
			}
			this.storage[key] = value;
		},
		remove: function (key) {
			if (this.storage) {
				delete this.storage[key];
			}
		},
		clear: function () {
			this.storage = {};
		}
	},

	/**
	 * DOM session storage strategy, adapts dom storage component
	 */
	session: createStorageStrategy(domStorage.session),

	/**
	 * DOM local storage strategy, adapts dom storage component
	 */
	local: createStorageStrategy(domStorage.local),

	/**
	 * Cookie storage strategy, adapts cookie component.
	 */
	cookie: {
		retrieve: function (key) {
			return cookie.get(key);
		},
		store: function (key, value) {

			//set expiry time to one month
			var MS_PER_DAY = 24 * 60 * 60 * 1000;
			var expireDate = new Date(Date.now() + 30 * MS_PER_DAY);

			cookie.set(key, value, expireDate);
		},
		remove: function (key) {
			cookie.remove(key);
		},
		clear: function () {
			// let's not go there...
		}
	}
};


/**
 * Adapts DOM storage component as strategy
 */
function createStorageStrategy(storage) {
	return {
		store: function (key, value) {
			storage.set(key, value);
		},
		retrieve: function (key) {
			return storage.get(key);
		},
		remove: function (key) {
			storage.remove(key);
		},
		clear: function () {
			storage.clear();
		}
	};

}

/**
 * Life cycle method for initialization, will be invoked by framework.
 */
exports.init = function () {
};

/**
 * Life cycle method for tear-down, will be invoked by framework.
 */
exports.dispose = function () {
};

/**
 * Store data with provided strategy.
 * @param {String} strategy
 * @param {String} key
 * @param {Object} value
 */
exports.store = function (strategy, key, value) {
	strategies[strategy].store(key, value);
};

/**
 * Retrieve data with provided strategy
 * @param {String} strategy
 * @param {String} key
 * @return {Object} stored data
 */
exports.retrieve = function (strategy, key) {
	return strategies[strategy].retrieve(key);
};

/**
 * Remove stored data for provided strategy.
 * @param {String} strategy
 * @param {String} key
 */
exports.remove = function (strategy, key) {
	strategies[strategy].remove(key);
};

/**
 * Remove all stored data in provided strategy.
 * @param {String} strategy
 */
exports.clear = function (strategy) {
	strategies[strategy].clear();
};

/**
 * Remove all stored data across all registered strategies.
 */
exports.clearAll = function () {
	for (var strategy in strategies) {
		if (strategies.hasOwnProperty(strategy)) {
			strategies[strategy].clear();
		}
	}
};

/**
 * Register a custom storage strategy implementing the following interface:
 *
 * retrieve(key){}        // Return value associated to provided key
 * store(key,value){}    // Associate provided value to provided key
 * remove(key){}        // Remove associated value to provided key
 * clear(){}            // Remove all key value associations
 *
 * @param {String} name
 * @param {object} strategy
 */
exports.registerStrategy = function (name, strategy) {
	strategies[name] = strategy;
};
