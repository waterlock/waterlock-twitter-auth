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
      res.json(500);
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
      res.json(500);
    } else {
      var _data = JSON.parse(data);
      var attr = {
        twitterId: _data.id,
        screenName: _data.screen_name,
        name: _data.name
      };

      User.findOrCreate({twitterId: attr.twitterId}, attr)
      .done(userFoundOrCreated);
    }  
  }

  /**
   * [userFoundOrCreated description]
   * @param  {[type]} err  [description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  function userFoundOrCreated(err, user){
    if(err){
      // ensure your using username instead of email
      console.log(err);
    }

    // log the attempt 
    // TODO: refactor this into waterlock
    var attempt = {user:user.id, ip: req.connection.remoteAddress, successful: true};
    Attempt.create(attempt).done(function(){});

    req.session.user = user;
    req.session.authenticated = true;
    res.json(user);
  }
};