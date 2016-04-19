var express = require('express');
var guidelinesRouter = express.Router();
var sql = require('mysql');




var router = function(nav, dbConnection){

    var guideList = [];

    guidelinesRouter.route('/')

        .get(function(req, res){
            dbConnection.query('select * from project_guidelines', function(err, recordset){
                console.log("Returned List: " + recordset);
                guideList  = recordset;
            });
            res.render('guidelineListView',{
                title:'Guideline List',
                nav:nav,
                guidelines:guideList});
        });

    guidelinesRouter.route('/:id')
        .all( function(req, res, next){
            var id = req.params.id;
            var guideline = {};
            dbConnection.query("select * from project_guidelines where item_id = " + id,{  },
                function(err, recordset){
                    if (0===recordset.length){
                        res.status(404).send('Guideline was not found.');
                    }else{
                        req.guideline = recordset[0];
                        next();
                    }
            });
        })
        .get(function(req, res){
            res.render('guidelineView',{
                title:'Guideline View',
                nav:nav,
                guideline:req.guideline});
        });

    return guidelinesRouter;
};

module.exports=router;