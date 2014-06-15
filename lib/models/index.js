'use strict';

module.exports = {
  twitterId: {
    type: 'integer',
    required: true,
    unique: true
  },
  screenName: {
    type: 'string'
  },
  name:{
    type: 'string'
  }
};