'use strict';

var method = require('../../waterlock-twitter-auth');
var oauth = method.oauth;
var twitter = method.twitter;

/**
 * Oauth action
 */
module.exports = function (req, res){
  oauth.getOAuthAccessToken(req.session.oauthRequestToken, 
    req.session.oauthRequestTokenSecret, 
    req.query.oauth_verifier, accessTokenResponse);


  /**
   * [accessTokenResponse description]
   * @param  {[type]} error                  [description]
   * @param  {[type]} oauthAccessToken       [description]
   * @param  {[type]} oauthAccessTokenSecret [description]
   * @param  {[type]} results                [description]
   * @return {[type]}                        [description]
   */
  function accessTokenResponse(error, oauthAccessToken, oauthAccessTokenSecret, results){
    if (error) {
      console.log(error);
      res.serverError();
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      oauth.get(twitter.userProfile+'?user_id='+results.user_id, 
        req.session.oauthAccessToken, 
        req.session.oauthAccessTokenSecret, userInfoResponse);  
    }
  }

  /**
   * [userInfoResponse description]
   * @param  {[type]} error    [description]
   * @param  {[type]} data     [description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  function userInfoResponse(error, data){
    if (error) {
      console.log(error);
      res.serverError();
    } else {
      var _data = JSON.parse(data);
      var attr = {
        twitterId: _data.id,
        screenName: _data.screen_name,
        name: _data.name
      };

      global.authEvent.findOrCreate({twitterId: attr.twitterId}, attr, req.session.user, userFound);
    }  
  }

  function userFound(err, user){
    var authEvent = global.authEvent;
    if(err){
      // ensure your using username instead of email
      console.log(err);
      authEvent.loginFailure(req, res, null, {error: 'trouble creating model'});
    }
    
    authEvent.loginSuccess(req, res, user);
  }
};