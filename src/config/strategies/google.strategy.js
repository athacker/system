var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/userModel');


module.exports = function(){

    passport.use(new GoogleStrategy({
            clientID: '116094668553-4l21e4g71bkcl24jftdk6u7nfd8ggdh8.apps.googleusercontent.com',
            clientSecret: 'A4Uj89wtwZ2FDWdoXTlFYb3Y',
            callbackURL: 'http://localhost:3000/oauth/google/callback',
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {

            if(req.user){
                console.log("User is already on request thread for Google Login.");
                if(req.user.twitter){
                    console.log("User has already logged into Twitter.");
                    var query= {
                       'twitter.id': req.user.twitter.id
                    }
                }else if(req.user.facebook){
                    console.log("User has already logged into Facebook.");
                    var query={
                        'facebook.id':req.user.facebook.id
                    }
                }

                User.findOne(query, function(err, user){
                    if(user) {
                        user.google = {};
                        user.google.id = profile.id;
                        user.google.token = accessToken;
                        user.save();
                        done(err, user);
                    }else{
                        console.log("Google Login Failure..");
                    }
                });



            }else{


                var query={
                  'google.id':profile.id
                };

                User.findOne(query, function(err, user){
                    if(user) {
                       done(null,user );
                    }else{
                        var user = new User;
                        user.email =  profile.emails[0].value ;
                        user.image= profile._json.image.url ;
                        user.gender = profile.gender;
                        user.displayName= profile.displayName ;

                        user.google={};
                        user.google.id=profile.id;
                        user.google.token=accessToken;
                        user.save();
                        done(err, user);

                    }
                 });

            }


        }
    ));


};