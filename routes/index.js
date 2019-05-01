var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Motor1 News Homepage' });
});
router.get('/news', function(req, res, next) {
  res.render('news', { title: 'News' });

});
router.get('/admin/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'News' });

});
router.get('/admin/profile', function(req, res, next) {
  res.render('profile', { title: 'News' });

});
router.get('/admin/users-table', function(req, res, next) {
  res.render('users-table', { title: 'News' });

});
router.get('/admin/posts-table', function(req, res, next) {
  res.render('posts-table', { title: 'News' });

});
router.get('/admin/write-post', function(req, res, next) {
  res.render('write-post', { title: 'News' });

});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login to be our users' });

});
module.exports = router;
