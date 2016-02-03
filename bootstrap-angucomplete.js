angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/angucomplete/angucomplete.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div>\n\n\n      <angucomplete-alt\n        focus-out=\"form.spectrumOptions.focusOut()\"\n        image-field=\"{{form.spectrumOptions.image}}\"\n        input-class=\"{{form.spectrumOptions.image || \'form-control\'}}\"\n        input-name=\"$$value$$\"\n        minlength=\"{{form.spectrumOptions.minlength || \'1\'}}\"\n        override-suggestions=\"true\"\n        pause=\"400\"\n        local-data=\"{{form.spectrumOptions.data || []}}\"\"\n        remote-url=\"{{form.spectrumOptions.url || null}}\"\n        search-fields=\"{{form.spectrumOptions.search}}\"\n        text-no-results=false\n        title-field=\"{{form.spectrumOptions.title}}\">\n\n\n</div>\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");}]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var angucomplete = function(name, schema, options) {
    if (schema.type === 'string' && schema.format == 'angucomplete') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'angucomplete';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

    schemaFormProvider.defaults.string.unshift(angucomplete);

  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'angucomplete',
    'directives/decorators/bootstrap/angucomplete/angucomplete.html');
    schemaFormDecoratorsProvider.createDirective('angucomplete',
    'directives/decorators/bootstrap/angucomplete/angucomplete.html');
  }]);
