'use strict';

var _ = require('lodash');

exports.attributes = function(attr){
  var template = {
    twitterId: {
      type: 'integer',
      unique: true
    },
    screenName: {
      type: 'string'
    },
    name:{
      type: 'string'
    }
  };
  
  _.merge(template, attr);
  _.merge(attr, template);
};