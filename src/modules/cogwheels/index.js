/**
 * Cogwheels Porting
 */

'use strict';

var extend = require('utils/extend');
var layoutEngine = require('layout-engine');
var messageBus = require('message-bus');
var router = require('router');
var webStorage = require('web-storage');

// list of modules to start as features
exports.features = [];

exports.start = function(config) {
    
    config = config || {};
    
    layoutEngine.init(config['layout-engine']);
    layoutEngine.start();
    
    router.init(config['router']);
    webStorage.init(config['web-storage']);
    
    /**
     * Features Init
     */
    this.features.forEach(function(feature) {
        if (feature.init) {
            feature.init();
        }
        if (feature.controllers) {
            feature.controllers.forEach(function(controller) {
                if (controller.init) {
                    controller.init(config);
                }
            });
        }
    });
    
    router.start();
    
    /**
     * Features Start
     */
    this.features.forEach(function(feature) {
        if (feature.start) {
            feature.start();
        }
        if (feature.controllers) {
            feature.controllers.forEach(function(controller) {
                if (controller.start) {
                    controller.start();
                }
            });
        }
    });
    
};

exports.dispose = function() {};
