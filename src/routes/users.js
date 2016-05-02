var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')( '1777604485787908', 'a7d60c887592f2e85e8adfd1a059db1b' );
var twitter = require('../services/twitter')('hC8v46dyIKyVOkGDb9OFnjR1q','Yc3sWym1MqCL91qhXgJrcbytKMplhaBhnMgT6KfYp07D74QeVw');


/* Be sure use has logged in first */
router.use('/', function(req, res, next){
  if (!req.user){
    res.redirect('/');
  }
  next();
});


router.use('/',function(req,res,next){
   
    if(req.user.twitter){
            twitter.getUserTimeLine(req.user.twitter.token,
                req.user.twitter.tokenSecret, req.user.twitter.id,
                function(results){
                   req.user.twitter.lastPost =results[0].text;
                    next();

            });
    };

});

router.get('/', function(req, res, next) {
    if(req.user.facebook){
        facebook.getImage(req.user.facebook.token,
            function(results){
                req.user.facebook.image = results.url;

                facebook.getFriends(req.user.facebook.token,
                    function(results){
                        req.user.facebook.friends=results.total_count;
                        res.render('users', {user:  req.user });
                } );


        });
    }else{
        res.render('users', {user:  req.user });
    }


 });

module.exports = router;
