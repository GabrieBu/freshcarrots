import express from 'express';
var router = express.Router();
import {getReviews} from "../controllers/reviewController.js";

/* GET home page. UNUSED SO FAR */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /getReviews
router.get('/getReviews', getReviews)


export default router;
