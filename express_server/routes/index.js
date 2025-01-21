var express = require('express');
var router = express.Router();
const axios = require('axios')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /movies
router.get('/get_all_movies', function (req, res) {
  res.json({name: 'Movies'});
})



module.exports = router;
