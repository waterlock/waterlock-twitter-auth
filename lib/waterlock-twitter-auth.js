'use strict';

var path = require('path');
var OAuth = require('oauth').OAuth;
var twitter = require('./twitter');

exports.authType = 'twitter';

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.js');
  var config = require(configPath).waterlock;
}catch(e){
  throw 'waterlock not installed';
}

var method = {};
if(typeof config.authMethod[0] === 'object'){
  for(var i = 0; i < config.authMethod.length; i++){
    if(config.authMethod[i].name === 'waterlock-twitter-auth'){
      method = config.authMethod[i];
    }
  }
}else{
  method = config.authMethod;
}

exports.config = config;
exports.authConfig = method;
exports.twitter = twitter;
exports.installPath = path.normalize(__dirname+'/../../../');

exports.oauth =  new OAuth(twitter.requestToken, twitter.accessToken, 
    method.consumerKey, method.consumerSecret, 
    '1.0A', config.baseUrl+twitter.callbackUri, 'HMAC-SHA1'); 

exports.actions = require('./controllers');

exports.model = require('./models');