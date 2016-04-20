var express = require('express'),
    adminRouter = require('./src/routes/adminRoutes'),
    guidelinesRouter = require('./src/routes/guidelinesRoutes');

var app = express();
var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT||3000;

//default nav bar items
var nav= [ { item_id: 0,
    title: 'Guidelines',
    link: '/guidelines',
    text: 'Guidelines' },
    { item_id: 1,
        title: 'Architecture',
        link: '/architecture',
        text: 'Architecture' },
    { item_id: 2,
        title: 'Documentation',
        link: '/documentation',
        text: 'System Documentation' },
    { item_id: 3,
        title: 'Quality',
        link: '/quality',
        text: 'Quality' } ]

//mongo
var url = 'mongodb://localhost:27017/projectApp';
mongodb.connect(url, function (err, db) {
    if (err) {
        console.log("Error ecnountered connecting to mongo db");
    } else {
        conn = db;
        var collection = conn.collection('navigation');

        //seed nav bar data
        collection.deleteMany(),function(err,results){};
        collection.insertMany(nav), function(err,results) {
            nav = results;
        };
    }
});


app.use(express.static('public'));
app.use(express.static('src/views'));
app.use('/guidelines',guidelinesRouter(nav, url));
app.use('/admin',adminRouter(nav, url));

app.set('views','./src/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('index', {title: 'Project Documentation', navs:nav});
});


var server = app.listen(port, function(err){
    console.log('Nodemon -> Express server started on port ' + port);
});

