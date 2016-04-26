var express = require('express');
var guidelinesRouter = express.Router();
var Controller = require('../controllers/guidelineController');




var router = function(navbar, url ){

    var guidelineController = new Controller(null, navbar);

    guidelinesRouter.use(function(req,res,next){
        guidelineController.middleware(req, res, next);
        //if(!req.user){
        //    res.redirect('/');
        //}else{
        //    next();
        //}
    });

    guidelinesRouter.route('/')
      .get( function(req,res){
            guidelineController.getAll(req,res);
       });




    guidelinesRouter.route('/:id')
      .get(function(req, res){
          guidelineController.getById(req,res);
      });

    return guidelinesRouter;
};

module.exports=router;