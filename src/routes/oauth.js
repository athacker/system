var express = require('express');
var passport = require('passport');
var router = express.Router();


router.use(function(req,res,next){

    console.log(req.user);
    next();
});



router.route('/google/callback')
    .get(passport.authenticate('google',{
        successRedirect: '/users/',
        failureRedirect: '/errror'
    }));
router.route('/google')
    .get(passport.authenticate('google', {
        scope:['profile email']
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook',{
        successRedirect: '/users/',
        failureRedirect: '/errror'
    }));
router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope:['email']
    }));


router.route('/twitter/callback')
    .get(passport.authenticate('twitter',{
        successRedirect: '/users',
        failureRedirect: '/error'
    }));
router.route('/twitter')
    .get(passport.authenticate('twitter'));


module.exports = router;
