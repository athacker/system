var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');


module.exports = function(){

    passport.use(new FacebookStrategy( {
        clientID:'1777604485787908',
        clientSecret:'a7d60c887592f2e85e8adfd1a059db1b',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback',
        passReqToCallback:true
    },function( req, accessToken, refreshToken, profile, done){
        if(req.user){

            if(req.user.google){
                var query={
                    'google.id':req.user.google.id
                }
            }else if(req.user.twitter){
                var query={
                    'twitter.id':req.user.twitter.id
                }
            }
            User.findOne(query,function(err,user){
                if(user){
                    user.facebook={};
                    user.facebook.id=profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.refreshToken = refreshToken;
                    user.save();
                    done(err, user);
                }else{
                    console.log("Facebook Login Failure... ");
                }


            });




        }else {
            var query = {
                'facebook.id': profile.id
            };

            User.findOne(query, function (err, user) {
                if (user) {
                    done(err, user);
                } else {
                    user = new User();
                    user.displayName = profile.displayName;
                    user.facebook = {};
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.save();
                    done(err, user);
                }
            });

        }

    }));





};