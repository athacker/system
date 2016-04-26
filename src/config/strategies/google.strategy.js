var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


module.exports = function(){

    passport.use(new GoogleStrategy({
            clientID: '116094668553-4l21e4g71bkcl24jftdk6u7nfd8ggdh8.apps.googleusercontent.com',
            clientSecret: 'A4Uj89wtwZ2FDWdoXTlFYb3Y',
            callbackURL: 'http://localhost:3000/oauth/google/callback'
        },
        function(req, accessToken, refreshToken, profile, done) {
            done(null, profile);

        }
    ));


};