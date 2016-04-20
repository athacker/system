var express = require('express');
var guidelinesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var conn= {};
var guideline = {};
var router = function(navbar, url ){
    var guideList = [];
    guidelinesRouter.route('/')
        .all(function (req, res, next){
            mongodb.connect(url, function (err, db) {
                if (err) {
                    console.log("Error ecnountered connecting to mongo db");
                } else {
                    conn = db;
                    next();
                }
            });
         })
        .get(function(req, res){
            var collection = conn.collection('guidelines');
             collection.find().toArray(function(err, data){
                 guideList = data;
            });
            res.render('guidelineListView',{
                title:'Project Guidelines',
                navs:navbar,
                guidelines:guideList});
        });

    guidelinesRouter.route('/:id')
        .all(function (req, res, next){
        mongodb.connect(url, function (err, db) {
            if (err) {
                console.log("Error ecnountered connecting to mongo db");
            } else {
                conn = db;
                next();
            }
        });
    })
        .get(function(req, res){
            var id = new ObjectId(req.params.id);

            var collection = conn.collection('guidelines');
            collection.findOne({_id:id},function(err, data){
                guideline = data;
             });
        res.render('guidelineView',{
                title:'Guideline View',
                navs:navbar,
                guideline:guideline});
        });

    return guidelinesRouter;
};

module.exports=router;