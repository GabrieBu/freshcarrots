var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello from Express!' }); // Send JSON response instead of rendering 'index' view
});

module.exports = router;
