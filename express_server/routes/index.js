var express = require('express');
var router = express.Router();
const axios = require('axios')
import {getFirst100Movies, getFirstMovies} from "../controllers/movieController.js";

/* GET home page. UNUSED SO FAR */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /movies
router.get('/get_all_movies', getFirstMovies)



module.exports = router;
