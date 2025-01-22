import express from 'express';
var router = express.Router();
import {getLatestMovies} from "../controllers/movieController.js";

/* GET home page. UNUSED SO FAR */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /movies
router.get('/getLatestMovies', getLatestMovies)


export default router;
