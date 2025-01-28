import express from 'express';
var router = express.Router();
import {getReviews} from "../controllers/reviewController.js";
import {newDiscussion, getDiscussions, getMessages, newMessage} from "../controllers/discussionController.js";

/* GET home page. UNUSED SO FAR */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//will match requests to /getReviews
router.get('/getReviews', getReviews)

router.post('/newDiscussion', newDiscussion)

router.get('/getDiscussions', getDiscussions)

router.get('/getMessages', getMessages)

router.post("/newMessage", newMessage);



export default router;
