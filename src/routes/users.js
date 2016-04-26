var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('User Router -> forward to user web page.');

  res.render('users', {user: { name:req.user.displayName, userId: req.user.id, picture: req.user.picture, gender: req.user.gender } });
});

module.exports = router;
