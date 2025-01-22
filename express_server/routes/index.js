import express from 'express';
var router = express.Router();
import {getFirstMovies} from "../controllers/movieController.js";

/* GET home page. UNUSED SO FAR */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /movies
router.get('/get_all_movies', getFirstMovies)


export default router;
