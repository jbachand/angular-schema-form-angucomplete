/* jshint expr: true */
chai.should();

describe('Schema form', function() {

  describe('directive', function() {
    beforeEach(module('templates'));
    beforeEach(module('schemaForm'));
    beforeEach(
      //We don't need no sanitation. We don't need no though control.
      module(function($sceProvider) {
        $sceProvider.enabled(false);
      })
    );

    it('should return correct form type for format "angucomplete"',function(){
      inject(function($compile,$rootScope, schemaForm){
        var string_schema = {
          type: "object",
          properties: {
            complete: {
              type: "string",
            }
          }
        };

        var angucomplete = {
          type: "object",
          properties: {
            complete: {
              type: "string",
              format: "angucomplete"
            }
          }
        };

        schemaForm.defaults(string_schema).form[0].type.should.be.eq("text");
        schemaForm.defaults(angucomplete).form[0].type.should.be.eq("angucomplete");
      });
    });

  });
});
