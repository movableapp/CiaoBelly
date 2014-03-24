'use strict';

var _window = window;

function serialize(data) {
	return JSON.stringify(data);
}

function deserialize(data) {
	// Note: using == instead of === since we don't care if it is null or undefined
	if (data == null) {
		return undefined;
	}
	return JSON.parse(data);
}

var api = {
	set: function (key, data) {
		this.storage.setItem(key, serialize(data));
	},
	get: function (key) {
		return deserialize(this.storage.getItem(key));
	},
	remove: function (key) {
		this.storage.removeItem(key);
	},
	clear: function () {
		this.storage.clear();
	},
	supported: function () {
		return !!this.storage;
	}
};

var session = Object.create(api);
session.storage = _window.sessionStorage;

var local = Object.create(api);
local.storage = _window.localStorage;


exports.session = session;
exports.local = local;
