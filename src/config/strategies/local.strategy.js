var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;


module.exports = function(){
    passport.use (new LocalStrategy({
        usernameField:'userName',
        passwordField:'password'
    } ,function( username, password, doneCB){
        //database calls would happen here

        var url = 'mongodb://localhost:27017/projectApp';
        mongodb.connect(url, function(err,db){
           var collection = db.collection('users');

            collection.findOne({username: username}, function(err, results){
                var user = results;

                if(password === results.password){
                    doneCB(err, user);
                }else{
                    doneCB(null, false, {message: 'Bad Password'});
                }


            });


        });


    } ));
};