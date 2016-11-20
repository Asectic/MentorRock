// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://127.0.0.1:8000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here', // your App ID
        'consumerSecret'     : 'your-client-secret-here', // your App Secret
        'callbackURL'        : 'http://127.0.0.1:8000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here', // your App ID
        'clientSecret'     : 'your-client-secret-here', // your App Secret
        'callbackURL'      : 'http://127.0.0.1:8000/auth/google/callback'
    }

};
