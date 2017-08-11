//import dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models')

//create instances
var app = express(),
    router = express.Router();

// set port to env or 3001
var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost/wayfarer');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

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

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

//adding the /posts route to our /api router
// router.route('/posts')
//   //retrieve all posts from the db
//   .get(function(req, res){
//     //looks at our Post Schema
//     Post.find(function(err, posts){
//       if (err)
//         res.send(err);
//         res.json(posts);
//     })
//   })
//   .post(function(req, res){
//     var post = new Post();
//     post.user = req.body.user;
//     post.text = req.body.text;]
//     post.date = req.body.date;
//
//     post.save(function(err){
//       if (err)
//         res.send(err);
//         res.json({message: 'Post successfully added'});
//     });
//   });
//
// router.route('/posts/:id')
//   //retrieve one specific post by id
//   .get(function(req, res){
//     Post.find(function(err, posts){
//       if (err)
//         res.send(err);
//         res.json(posts)
//     })
//   })


//adding the /cities route from our /api router
  router.route('/cities')
    //retrieve all posts from the db
    .get(function(req, res){
      //looks at our Post Schema
      db.City.find(function(err, posts){
        if (err)
          res.send(err);
          res.json(posts);
      })
    })
    .post(function(req, res){
      var city = new db.City();
      city.city = req.body.city; //change to name?
      city.country = req.body.country;
      city.img = req.body.img;

      city.save(function(err){
        if (err)
          res.send(err);
          res.json({message: 'City post success!'});
      });
    });

  router.route('/cities/:id')
    //retrive one specific id
    .get(function(req, res){
      db.City.findById(req.params.id, function(err, city){
        if (err)
          res.send(err);
          res.json(city);
      })
    })

  router.route('/cities/:cityId/posts')
    .get(function(req, res){
      db.City.findById(req.params.cityId, function(err, city) {
        if (err) res.json(err);
        res.json(city.posts);
      });
    })

    .post(function(req, res){
      db.City.findById(req.params.cityId, function(err, city){
        const doc = {
          user: req.body.user,
          text: req.body.text,
          date: new Date()
        };
        var newPost = new db.Post(doc);
        console.log("NEW POST", newPost);
        city.posts.unshift(newPost);
        city.save(function(err, savedCity){
          if (err) res.json(err);
          res.json(newPost);
        });
      });
    })

//start server
  app.listen(port, function(){
    console.log("API IS RUNNING ON PORT " + port);
  })
