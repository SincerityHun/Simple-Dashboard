var express = require('express');
var router = express.Router();

router.get("/add", function (req, res, next) {
  res.render("day1_add", {});
});

router.get("/check", function (req, res, next) {
  res.render("day1_check", {});
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('day1_main', { });
});

module.exports = router;