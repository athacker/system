var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/projectApp'

var guidelineController = function(serice, navbar){



    var getAll = function(req, res){
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('guidelines');

            collection.find().toArray(function(err, data){
                res.render('guidelineListView',{
                title:'Project Guidelines',
                navs:navbar,
                guidelines:data
                });
            });

        });
    };

    var getById = function(req,res){
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('guidelines');
            var id = new ObjectId(req.params.id);
            collection.findOne({_id:id},function(err, data){
                res.render('guidelineView',{
                    title:'Guideline View',
                    navs:navbar,
                    guideline :data });
            });

        });


    };



    return{
        getAll: getAll,
        getById: getById
    }




};



module.exports = guidelineController;