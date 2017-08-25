var db = require('../models');

function getAllPosts(req, res){//GET all posts
  db.City.findById(req.params.cityId, function(err, city) {
    if (err) res.json(err);
    res.json(city.posts);
  });
}

function newPost(req, res){ //POST a new post
  db.City.findById(req.params.cityId, function(err, city){
    const doc = {
      user: req.body.user,
      title: req.body.title,
      text: req.body.text,
      date: new Date()
    };
    var newPost = new db.Post(doc);
    city.posts.unshift(newPost);
    city.save(function(err, savedCity){
      if (err) res.json(err);
      res.json(newPost);
    });
  });
}
//route to delete specific post by id
function destroy(req, res){
  db.City.findById(req.params.cityId, function(err, city){
    let correctPost = city.posts.id(req.params.postId)
    console.log("req.params.postId", req.params.postId);
    if(correctPost){
      correctPost.remove();
      city.save(function(err, saved){
        console.log("Removed ", correctPost);
        res.status(200).send();
      })
    }
    else{
      return res.status(404).send("OH NO!!");
    }
  })
}

function getOne(req, res){ //GET one post
  db.City.findById(req.params.cityId, function (err, city) {
    if (err) return res.json(err);
    res.json(city.posts.id(req.params.postId));
  });
}

function updatePost(req, res){
  db.City.findById(req.params.cityId, function (err, city) {
    if (err) return res.json(err);
    const post = city.posts.id(req.params.postId);
    for (let i in req.body) {
      post[i] = req.body[i];
    }
    city.save(function(err, city) {
      if (err) return res.json(err);
      res.json(post);
    });
  });
}

module.exports = {
  getAllPosts: getAllPosts,
  newPost: newPost,
  destroy: destroy,
  getOne: getOne,
  updatePost: updatePost
}
