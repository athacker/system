var express = require('express'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    adminRouter = require('./src/routes/adminRoutes'),
    authRouter = require('./src/routes/authRoutes'),
    guidelinesRouter = require('./src/routes/guidelinesRoutes');

var app = express();
var mongodb = require('mongodb').MongoClient;

var port = process.env.PORT||3000;

//default nav bar items
var nav= [ { sort: 0,
    title: 'Guidelines',
    link: '/guidelines',
    text: 'Guidelines' },
    { sort: 1,
        title: 'Architecture',
        link: '/architecture',
        text: 'Architecture' },
    { sort: 2,
        title: 'Documentation',
        link: '/documentation',
        text: 'System Documentation' },
    { sort: 3,
        title: 'Quality',
        link: '/quality',
        text: 'Quality' } ];

//mongo
var url = 'mongodb://localhost:27017/projectApp';
mongodb.connect(url, function (err, db) {
    if (err) {
        console.log('Error ecnountered connecting to mongo db');
    } else {

        var collection = db.collection('navigation');

        //seed nav bar data
        collection.deleteMany(), function(err,results){
            if(err){console.log('Err cleaning up navigation collection.');
            }
        };
        collection.insertMany(nav), function(err,results) {
            nav = results;
        };
    }
});

//middleware
app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: 'project'}));

require('./src/config/passport')(app);

//routes
app.use('/guidelines',guidelinesRouter(nav, url));
app.use('/admin',adminRouter(nav, url));
app.use('/auth', authRouter(url));

app.set('views','./src/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('index', {title: 'Project Documentation', navs:nav});
});


var server = app.listen(port, function(err){
    console.log('Nodemon -> Express server started on port ' + port);
});

