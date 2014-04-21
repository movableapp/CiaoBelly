
var layoutEngine = require('layout-engine');
var template = require('./template.html');

exports.show = function() {
    layoutEngine.render(template, {
        save: function() {
            alert("save");
        }
    }, 'header');
};
