'use strict';

/**
 * [login description]
 * @type {[type]}
 */
exports.login = require('./actions/login');

/**
 * [logout description]
 * @type {[type]}
 */
exports.logout = require('./actions/logout');

/**
 * [oauth description]
 * @type {[type]}
 */
exports.extras = {
  twitter_oauth: require('./actions/oauth')
};