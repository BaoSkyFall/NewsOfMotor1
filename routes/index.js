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
module.exports = router;
