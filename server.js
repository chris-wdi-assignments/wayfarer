//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//create instances
var app = express(),
    router = express.Router();

// set port to env or 3001
var port = process.env.API_PORT || 3001;

var controllers = require('./controllers')

//db config
const dbPath = process.env.MONGODB_URI || 'mongodb://localhost'
mongoose.connect(dbPath + '/wayfarer');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: '12345', // super secure
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', router);

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});
///////////////////////////////
////*******Cities*******////////
///////////////////////////////
router.route('/cities')
  .get(controllers.city.getAllCities) //GET all cities
  .post(controllers.city.postCity) //CREATE new city

router.route('/cities/:cityId')
   .get(controllers.city.getOne)
   .delete(controllers.city.destroy)
   .put(controllers.city.update)

////////////////////////////
//********Posts******//////
////////////////////////////
router.route('/cities/:cityId/posts')
  .get(controllers.post.getAllPosts)
  .post(controllers.post.newPost)

router.route('/cities/:cityId/posts/:postId')
  .get(controllers.post.getOne)
  .delete(controllers.post.destroy)
  .put(controllers.post.updatePost)

////////////////////////////
//////*********Users********/////////////
////////////////////////////
router.route('/users')
  .get(controllers.user.index)
  .post(controllers.user.create)

router.route('/users/:id')
  .get(controllers.user.show)
  .put(controllers.user.update)

const middlew = (req, res, next) => next();
//const middlew = passport.authenticate('local');
console.log(middlew);
//passport routes
router.route('/login')
  .post(function (req, res) {
  //.post(function (req, res) {
    console.log('User tried to login...');
    console.log(JSON.stringify(req.body));
    controllers.user.login(req, res)
  });
router.route('/logout').get(function (req, res) {
  console.log("BEFORE logout", req);
  req.logout();
  res.send(req);
  console.log("AFTER logout", req);
});


//start server
app.listen(port, function() {
  console.log("API IS RUNNING ON PORT " + port);
})
