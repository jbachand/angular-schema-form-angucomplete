angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/angucomplete/angucomplete.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}-----</label>\n  <div>\n    <span style=\"display:none\">{{$$value$$=selected}}</span>\n      <angucomplete-alt\n        focus-out=\"form.completeOptions.focusOut()\"\n        image-field=\"{{form.completeOptions.image}}\"\n        input-class=\"{{form.completeOptions.class || \'form-control\'}}\"\n        input-name=\"$$value$$\"\n        minlength=\"{{form.completeOptions.minlength || \'1\'}}\"\n        override-suggestions=\"true\"\n        pause=\"400\"\n        local-data=\"form.completeOptions.data\"\n        remote-url=\"{{form.completeOptions.url}}\"\n        search-fields=\"{{form.completeOptions.search}}\"\n        selected-object=\"form.completeOptions.select || selected\"\n        text-no-results=false\n        title-field=\"{{form.completeOptions.title}}\">\n\n\n</div>\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");}]);
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
