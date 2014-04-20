
var templates = {};

exports.register = function(name, template) {
    templates[name] = template;
};

exports.init = function() {
    ko.setTemplateEngine(createTemplateEngine(new ko.nativeTemplateEngine()));
};

function createTemplateEngine(engine) {
    engine.makeTemplateSource = function(template) {
        if (typeof template === 'string') {
            
            // registered template
            if (templates[template]) {
                return new commonJsTemplate(template);
            
            // script id template
            } else {
                var templateDocument = templateDocument || document,
                    elem = templateDocument.getElementById(template);

                if (!elem) {
                    throw new Error("Cannot find template with ID " + template);
                }

                return new ko.templateSources.domElement(elem);
            }
            
        // Anonymous template
        } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
            return new ko.templateSources.anonymousTemplate(template);
        } else {
            throw new Error("Unknown template type: " + template);
        }

    };
    return engine;
}

function commonJsTemplate(template) {
    this.templateName = template;
    this.templates = {};
};

commonJsTemplate.prototype.text = function (value) {
    if (!value) {
        this.templates[this.templateName] = templates[this.templateName];
        return this.templates[this.templateName];
    }
    this.templates[this.templateName] = value;
};

commonJsTemplate.prototype.data = function(key, value) {
    var name = this.templateName;
    this.templates._data = this.templates._data || {};
    this.templates._data[name] = this.templates._data[name] || {};
    if (!value) {
        return this.templates._data[name][key];
    }
    this.templates._data[name][key] = value;
};