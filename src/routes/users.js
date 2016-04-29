var express = require('express');
var router = express.Router();

/* Be sure use has logged in first */
router.use('/', function(req, res, next){
  if (!req.user){
    res.redirect('/');
  }
  next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('User Router -> forward to user web page.');
  res.render('users', {user:  req.user });
 // res.render('users', {user: { name:req.user.displayName, userId: req.user.id, picture: req.user.image, gender: req.user.gender } });
});

module.exports = router;
