var should = require('should');
var proxyquire =  require('proxyquire');

var pathStub = {
  normalize: function(str){
    return __dirname+"/waterlock.config.json";
  }
};

var wl = proxyquire.noCallThru().load('../lib/waterlock-twitter-auth', { 'path': pathStub});

describe('waterlock-twitter-auth', function(){
  it('should export install path', function(done){
    wl.should.have.property('installPath');
    wl.installPath.should.be.String;
    done();
  });
  it('should export actions', function(done){
    wl.should.have.property('actions');
    wl.actions.should.be.Object;
    done();
  });
  it('should export a model', function(done){
    wl.should.have.property('model');
    wl.actions.should.be.Object;
    done();
  });
  it('should export a twitter config', function(done){
    wl.should.have.property('twitter');
    wl.actions.should.be.Object;
    done();
  });
})