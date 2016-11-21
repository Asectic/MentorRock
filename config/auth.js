// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '158282974577582', // your App ID
        'clientSecret'    : '07e16a0a1f9f0aa6f526659c6d9f9bb3', // your App Secret
        'callbackURL'     : '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'gender', 'name']
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here', // your App ID
        'consumerSecret'     : 'your-client-secret-here', // your App Secret
        'callbackURL'        : 'http://127.0.0.1:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here', // your App ID
        'clientSecret'     : 'your-client-secret-here', // your App Secret
        'callbackURL'      : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
