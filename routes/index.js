var express = require('express');
var router = express.Router();
var newsModel = require('../models/news.model');
var adminModel = require('../models/admin.model')
/* GET home page. */
router.get('/', function (req, res, next) {
  newsModel.getallnews()
    .then(rows => {
      var allnews = JSON.parse(JSON.stringify(rows));
      newsModel.get8newset().then(rows => {
        var allnewsest = JSON.parse(JSON.stringify(rows));
        newsModel.get2newset().then(rows => {
          var newsest = JSON.parse(JSON.stringify(rows));
          var isLogin = false;
          res.render('index', {isLogin:isLogin, title: 'Motor1 News Homepage', allnews: allnews, allnewsest: allnewsest, twonewsest: newsest });

        })

      })
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });

});
//Get news
router.get('/news/:title', function (req, res, next) {
  console.log(req.params.title);
  newsModel.getnewsbyTitle(req.params.title).then(rows => {
    var news = JSON.parse(JSON.stringify(rows));
    console.log(news[0].ID);
    newsModel.getcommentbyID(news[0].ID).then(rows => {
      var comments = JSON.parse(JSON.stringify(rows));
    
      res.render('news', { title: req.params.title, news: news, comments: comments });

    })
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
router.get('/admin/dashboard', function (req, res, next) {
  
  res.render('dashboard', { title: 'News' });

});
router.get('/admin/profile', function (req, res, next) {
  res.render('profile', { title: 'News' });

});
router.get('/admin/users-table', function (req, res, next) {
  adminModel.getallUsers().then(rows=>{
    var data_users = JSON.parse(JSON.stringify(rows));
    res.render('users-table', { title: 'Table of all Users',data_users: data_users });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
router.post('/admin/add-user', (req, res) => {
  adminModel.addUser(req.body).then(id => {
    // console.log(id);
    res.redirect('/admin/users-table');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})
router.post('/admin/update-user', (req, res) => {
  adminModel.updateUser(req.body).then(n => {
    res.redirect('/admin/users-table');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
});
router.post('/admin/delete-user/:ID', (req, res) => {
  

  var i = req.params.ID;
  adminModel.deleteUser(i).then(n => {
    res.redirect('/admin/users-table');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
});
router.get('/admin/posts-table', function (req, res, next) {
  newsModel.getallnews()
  .then(rows=>{
    var data_posts = JSON.parse(JSON.stringify(rows));

    res.render('posts-table', { title: 'Table of all Post',data_posts: data_posts });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
});
router.post('/admin/check-pass', (req, res) => {
  
  adminModel.checkUsers(req.body.username,req.body.password).then(rows =>
    {
      // console.log(rows);
      if(rows.length>0)
      {
        console.log("User correct");
        var isLogIn = true;
        res.redirect('/',);
      }
      else
      console.log("User Incorrect");
    })
})
router.get('/admin/posts-table/:title', function (req, res, next) {
  newsModel.getnewsbyTitle(req.params.title)
  .then(rows=>{
    var data_post = JSON.parse(JSON.stringify(rows));
    console.log(data_post);
  
    
    res.render('edit-post', { title: 'Edit Post',data_post: data_post });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
});
router.post('/admin/add-post', (req, res) => {
  console.log(req.body);
  // res.redirect('admin/write-post');
  // adminModel.addUser(req.body).then(id => {
  //   // console.log(id);
  //   res.redirect('/admin/users-table');
  // }).catch(err => {
  //   console.log(err);
  //   res.end('error occured.')
  // });
});
  router.post('/admin/delete-post/:ID', (req, res) => {
    var i = req.params.ID;
    console.log(i);
    newsModel.deletePostbyID(i).then(n => {
      res.redirect('/admin/posts-table');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  });
router.get('/admin/write-post', function (req, res, next) {
  newsModel.getallUsers().then(rows=>{
    var data_user = JSON.parse(JSON.stringify(rows));
    newsModel.getallKinds().then(rows=>{
      var data_kinds = JSON.parse(JSON.stringify(rows));

      res.render('write-post', { title: 'Write new post',data_user:data_user,data_kinds:data_kinds });

    })

  })

});
//Get page by category
router.get('/category-:cat', function (req, res, next) {
  newsModel.getnewsbyCATEGORY(req.params.cat).then(rows => {
    var newscategory = JSON.parse(JSON.stringify(rows));
    var title = "News of Motor1 " + req.params.cat +" Category"

    res.render('page', {category: req.params.cat, title: title, newscategory: newscategory });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
//Get page by kind

router.get('/category-:cat/:kind', function (req, res, next) {
  newsModel.getallnewsbyKIND(req.params.kind).then(rows => {
    var newskind = JSON.parse(JSON.stringify(rows));
    var title = "News of Motor1 " + req.params.cat +" Category"+ req.params.kind +" Kind"
    console.log(newskind);
    res.render('page-kind', {category: req.params.cat,kind: req.params.kind, title: title, newskind: newskind });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login to be our users' });

});
module.exports = router;
