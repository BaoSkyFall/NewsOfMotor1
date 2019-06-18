var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var router = express.Router();
var newsModel = require('../models/news.model');
var adminModel = require('../models/admin.model');
var localStorage = require('localStorage');
var app = express();
app.use(session({ resave: true, secret: '123456', saveUninitialized: true }));
app.use(router);

/* GET home page. */
router.get('/', function (req, res, next) {
  newsModel.getallnews()
    .then(rows => {
      var allnews = JSON.parse(JSON.stringify(rows));
      newsModel.get8newset().then(rows => {
        var allnewsest = JSON.parse(JSON.stringify(rows));
        newsModel.get2newset().then(rows => {
          var newsest = JSON.parse(JSON.stringify(rows));
          var isLogin;
          console.log(req.session.username);
          if (req.session.username) {
            isLogin = true;

          }
          else {
            isLogin = false;
          }
          res.render('index', { isLogin: isLogin, username: req.session.username, title: 'Motor1 News Homepage', allnews: allnews, allnewsest: allnewsest, twonewsest: newsest });

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
router.get('/admin', function (req, res, next) {
  if (req.session.username) {
    res.render('dashboard', { title: 'Admin dashboard' });

  }
  else {
    res.redirect("/login");
  }

});
router.get('/admin/dashboard', function (req, res, next) {

  if (req.session.username) {
    if (!req.session.userinfomation) {
      adminModel.getUserbyusername(req.session.username).then(rows => {
        var userinfomation = JSON.parse(JSON.stringify(rows));
        req.session.userinfomation = userinfomation;
      })
      if (req.session.userinfomation[0].PhanHe > 2) {
        res.render('dashboard', { title: 'Admin dashboard',userinfomation:req.session.userinfomation });

      }
      else {
        res.redirect('admin/profile');
      }
    }
    else {
      if (req.session.userinfomation[0].PhanHe > 2) {
        res.render('dashboard', { title: 'Admin dashboard',userinfomation:req.session.userinfomation });

      }
      else {
        res.redirect('/admin/profile');
      }
    }


  }
  else {
    res.redirect("/login");
  }

});
router.get('/admin/profile', function (req, res, next) {
  if (req.session.username) {
    if (!req.session.userinfomation) {
      adminModel.getUserbyusername(req.session.username).then(rows => {
        var userinfomation = JSON.parse(JSON.stringify(rows));
        req.session.userinfomation = userinfomation;
        console.log(req.session.userinfomation[0].PhanHe);
        res.render('profile', { title: 'Your User Profile', userinfomation: req.session.userinfomation });

      })
    }
    else {
      res.render('profile', { title: 'Your User Profile', userinfomation: req.session.userinfomation });

    }



  }

  else {
    res.redirect("/login");
  }

});
router.get('/admin/users-table', function (req, res, next) {
  if (req.session.username) {
    if (!req.session.userinfomation) {
      adminModel.getUserbyusername(req.session.username).then(rows => {
        var userinfomation = JSON.parse(JSON.stringify(rows));
        req.session.userinfomation = userinfomation;
      })

      if (req.session.userinfomation[0].PhanHe > 2) {
        adminModel.getallUsers().then(rows => {
          var data_users = JSON.parse(JSON.stringify(rows));
          res.render('users-table', { title: 'Table of all Users',userinfomation:req.session.userinfomation, data_users: data_users });

        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });
      }
      else {
        res.redirect('admin/profile');
      }
    }
    else {
      if (req.session.userinfomation[0].PhanHe > 2) {
        adminModel.getallUsers().then(rows => {
          var data_users = JSON.parse(JSON.stringify(rows));
          res.render('users-table', { title: 'Table of all Users',userinfomation:req.session.userinfomation, data_users: data_users });

        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });
      }
      else {
        res.redirect('/admin/profile');
      }
    }


  }
  else {
    res.redirect("/login");
  }




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
  if (req.session.username) {
    if (!req.session.userinfomation) {
      adminModel.getUserbyusername(req.session.username).then(rows => {
        var userinfomation = JSON.parse(JSON.stringify(rows));
        req.session.userinfomation = userinfomation;
      })

      if (req.session.userinfomation[0].PhanHe > 2) {
        newsModel.getallnews()
          .then(rows => {
            var data_posts = JSON.parse(JSON.stringify(rows));

            res.render('posts-table', { title: 'Table of all Post',userinfomation:req.session.userinfomation, data_posts: data_posts });

          }).catch(err => {
            console.log(err);
            res.end('error occured.')
          });
      }
      else {
        res.redirect('admin/profile');
      }
    }
    else {
      if (req.session.userinfomation[0].PhanHe > 2) {
        newsModel.getallnews()
          .then(rows => {
            var data_posts = JSON.parse(JSON.stringify(rows));

            res.render('posts-table', { title: 'Table of all Post', data_posts: data_posts,userinfomation:req.session.userinfomation });

          }).catch(err => {
            console.log(err);
            res.end('error occured.')
          });
      }
      else {
        res.redirect('/admin/profile');
      }
    }


  }
  else {
    res.redirect("/login");
  }



});
router.post('/admin/check-pass', (req, res) => {

  adminModel.checkUsers(req.body.username, req.body.password).then(rows => {
    // console.log(rows);
    if (rows.length > 0) {
      req.session.username = req.body.username;
      req.session.password = req.body.password;
      console.log(req.session.username);
      res.redirect("/");
    }
    else
      console.log("User Incorrect");
  })
})
router.get('/admin/posts-table/:title', function (req, res, next) {
  newsModel.getnewsbyTitle(req.params.title)
    .then(rows => {
      var data_post = JSON.parse(JSON.stringify(rows));
      console.log(data_post);


      res.render('edit-post', { title: 'Edit Post', data_post: data_post,userinfomation:req.session.userinfomation });

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
//Get Write -post
router.get('/admin/write-post', function (req, res, next) {
  if (req.session.username) {
    if (!req.session.userinfomation) {
      adminModel.getUserbyusername(req.session.username).then(rows => {
        var userinfomation = JSON.parse(JSON.stringify(rows));
        req.session.userinfomation = userinfomation;
      })

      if (req.session.userinfomation[0].PhanHe > 1) {
        newsModel.getallUsers().then(rows => {
          var data_user = JSON.parse(JSON.stringify(rows));
          newsModel.getallKinds().then(rows => {
            var data_kinds = JSON.parse(JSON.stringify(rows));

            res.render('write-post', { title: 'Write new post', data_user: data_user, data_kinds: data_kinds,userinfomation:req.session.userinfomation });

          })

        })
      }
      else {
        res.redirect('admin/profile');
      }
    }
    else {
      if (req.session.userinfomation[0].PhanHe > 1) {
        newsModel.getallUsers().then(rows => {
          var data_user = JSON.parse(JSON.stringify(rows));
          newsModel.getallKinds().then(rows => {
            var data_kinds = JSON.parse(JSON.stringify(rows));

            res.render('write-post', { title: 'Write new post',userinfomation:req.session.userinfomation, data_user: data_user, data_kinds: data_kinds });

          })

        })
      }
      else {
        res.redirect('/admin/profile');
      }
    }


  }
  else {
    res.redirect("/login");
  }



});
//Get page by category
router.get('/category-:cat', function (req, res, next) {
  newsModel.getnewsbyCATEGORY(req.params.cat).then(rows => {
    var newscategory = JSON.parse(JSON.stringify(rows));
    var title = "News of Motor1 " + req.params.cat + " Category"

    res.render('page', { category: req.params.cat, title: title, newscategory: newscategory });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
//Get page by kind

router.get('/category-:cat/:kind', function (req, res, next) {
  newsModel.getallnewsbyKIND(req.params.kind).then(rows => {
    var newskind = JSON.parse(JSON.stringify(rows));
    var title = "News of Motor1 " + req.params.cat + " Category" + req.params.kind + " Kind"
    console.log(newskind);
    res.render('page-kind', { category: req.params.cat, kind: req.params.kind, title: title, newskind: newskind });

  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });

});
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login to be our users' });

});
router.get('/logout', function (req, res, next) {
  req.session.destroy(function(err){
    if(err)
    {
      res.negotiate(err);
    }
    else
    {
      res.redirect('/login');

    }
  })

});
module.exports = app;
