var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    sql = require('mysql'),
    guidelinesRouter = require('./src/routes/guidelinesRoutes');

var app = express();


var port = process.env.PORT||3000;

var dbConnection = sql.createConnection({
    host: 'project-info-db-instance.cr1ksf6zj1sy.us-west-2.rds.amazonaws.com',
    user: 'db_user',
    password: '!01IceCream',
    database: 'project'
});


dbConnection.connect( function(err){
    if(err) {
        console.log('Error was encountered connecting to db: ' + err);
        return;
    }else{
        console.log("Connection was made to AWS MYSQL db");
    }
});


var nav=[];

dbConnection.query('select * from project_nav', function(err, recordset){
    console.log("Navigation List: " + recordset);
    nav = recordset;
});


app.use(express.static('public'));
app.use(express.static('src/views'));
app.use('/guidelines',guidelinesRouter(nav, dbConnection));


app.set('views','./src/views');
app.set('view engine', 'ejs');







app.get('/', function(req, res){
    res.render('index', {title: 'Project Documentation', navs:nav});
});


var server = app.listen(port, function(err){
    console.log('Nodemon -> Express server started on port ' + port);
});

