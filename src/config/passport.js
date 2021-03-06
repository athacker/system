var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser( function(user, doneCB){
         doneCB(null, user);
    });

    passport.deserializeUser( function(user, doneCB){
       doneCB(null, user);
    });
    require('./strategies/google.strategy')();
    require('./strategies/local.strategy')();
    require('./strategies/twitter.strategy')();
    require('./strategies/facebook.strategy')();

};