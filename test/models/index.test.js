var model = require('../../lib/models/').auth.attributes;

describe('model', function(){
  it('should be an object', function(done){
    model.should.be.Object;
    done();
  }); 
  it('should have a twitterId', function(done){
    model.should.have.property('twitterId');
    done();
  });
  it('should have a screenName', function(done){
    model.should.have.property('screenName');
    done();
  });
  it('should have a name', function(done){
    model.should.have.property('name');
    done();
  });
});