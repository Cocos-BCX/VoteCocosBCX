var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Models.witnesses.create({});
  res.status(200).json(config);
});

module.exports = router;
