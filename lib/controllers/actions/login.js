'use strict';
 
 var method = require('../../waterlock-twitter-auth');
 var oauth  = method.oauth;
 var twitter = method.twitter;

/**
 * Login action
 */
module.exports = function(req, res){

  oauth.getOAuthRequestToken(oauthResponse);

  /**
   * 
   * @param  {[type]} error            [description]
   * @param  {[type]} oauthToken       [description]
   * @param  {[type]} oauthTokenSecret [description]
   * @param  {[type]} results          [description]
   * @return {[type]}                  [description]
   */
  function oauthResponse(error, oauthToken, oauthTokenSecret){
    if (error) {
      console.log(error);
      res.json(500);      
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      
      res.redirect(twitter.authenticate+'?oauth_token='+req.session.oauthRequestToken);
    }
  }
};

