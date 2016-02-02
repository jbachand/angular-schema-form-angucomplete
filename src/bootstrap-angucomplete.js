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
