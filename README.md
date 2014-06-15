# Waterlock Twitter Auth

[![Build Status](http://img.shields.io/travis/davidrivera/waterlock-twitter-auth.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock-twitter-auth) [![NPM version](http://img.shields.io/npm/v/waterlock-twitter-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-twitter-auth) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock-twitter-auth.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock-twitter-auth)

waterlock-twitter-auth is a module for [waterlock](https://github.com/davidrivera/waterlock)
providing a twitter authentication method for users either based on username.

## Usage
set the following option in your `waterlock.json` config file

```json
"authMethod":{
	"name": "waterlock-twitter-auth",
	"consumerKey": "your-consumer-key",
	"consumerSecret": "your-consumer-secret"
}
```

Direct your user to `/auth/login` will initiate the oauth request. The callback uri is `/auth/oauth` if successfuly authenticated a user record will be created if a user is not found one will be created using the [waterlines](https://github.com/balderdashy/waterline) `findOrCreate` method