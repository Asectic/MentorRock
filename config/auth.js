// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1651440105155235', // your App ID
        'clientSecret'    : 'a938a07be870b910932026eb097f26f2', // your App Secret
        'callbackURL'     : '/auth/facebook/callback',
        profileFields: ['id', 'emails', 'gender', 'name']
    },

    'twitterAuth' : {
        'consumerKey'        : 'Iu42T3q8kfKzo53MWLzBZPsAF', // your App ID
        'consumerSecret'     : 'H7rgfWxEOeRLnK8XdNPWisMRK72eNI6dBV0iohW7vgaqmUzbzs', // your App Secret
        'callbackURL'        : 'http://127.0.0.1:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : 'your-secret-clientID-here', // your App ID
        'clientSecret'     : 'your-client-secret-here', // your App Secret
        'callbackURL'      : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
