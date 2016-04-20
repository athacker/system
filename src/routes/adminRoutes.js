var express = require('express');
//var mongodb = require('mongodb').MongoClient;
var adminRouter = express.Router();

var router = function(nav, url){

    adminRouter.route('/addGuideline').get(function(req, res){
        console.log("Admin Router");
        //var guidelines = [{title:'Quality', value:'Protractor, Karma, Jasmine, jUnit'}];
        //var collection = db.collection('guidelines');
        //
        ////collection.deleteMany(guidelines,function(err, data){
        ////   console.log("guideline collection was cleaned out.")
        ////});
        //
        //collection.insertMany(guidelines), function(err,results){
        //    res.send(results);
        //    db.close()
        //};

    });

    return adminRouter;
};

module.exports = router;