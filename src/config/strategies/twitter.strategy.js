var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');


module.exports = function(){

  passport.use (new TwitterStrategy({

      consumerKey:'hC8v46dyIKyVOkGDb9OFnjR1q',
      consumerSecret:'Yc3sWym1MqCL91qhXgJrcbytKMplhaBhnMgT6KfYp07D74QeVw',
      callbackURL:'http://localhost:3000/oauth/twitter/callback',
      passReqToCallback: true

  },function( req, token, tokenSecret, profile, done){

      if(req.user){

          if(req.user.google){
              var query={
                  'google.id':req.user.google.id
              }
          }else if(req.user.facebook){
              var query={
                  'facebook.id':req.user.facebook.id
              };
          }

          User.findOne(query, function(err, user){
              if(user) {
                  user.twitter = {};
                  user.twitter.id = profile.id
                  user.twitter.token = token;
                  user.twitter.tokenSecret = tokenSecret;
                  user.save();
                  done(null,user);
              }else{
                  console.log("Twitter Login Error..");
              }
          });



      }else {
          var query = {
              'twitter.id': profile.id
          };

          User.findOne(query, function (err, user) {

              if (user) {
                  console.log('Twitter user was found.');
                  done(null, user);
              } else {
                  console.log('Twitter user was NOT found');
                  user = new User();
                  //user.email =  profile.emails[0].value ;
                  user.image = profile._json.profile_image_url;
                  user.gender = profile.gender;
                  user.displayName = profile.displayName;

                  user.twitter = {};
                  user.twitter.id = profile.id;
                  user.twitter.token = token;
                  user.twitter.tokenSecret = tokenSecret;

                  user.save();
                  done(err, user);

              }
          });

      }//else

  }));


};