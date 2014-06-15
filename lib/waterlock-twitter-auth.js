'use strict';

var path = require('path');
var OAuth = require('oauth').OAuth;
var twitter = require('./twitter');

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'waterlock not installed';
}

exports.config = config;
exports.twitter = twitter;
exports.installPath = path.normalize(__dirname+'/../../../');

exports.oauth =  new OAuth(twitter.requestToken, twitter.accessToken, 
    config.authMethod.consumerKey, config.authMethod.consumerSecret, 
    '1.0A', config.baseUrl+twitter.callbackUri, 'HMAC-SHA1'); 

exports.actions = require('./controllers');

exports.model = require('./models');