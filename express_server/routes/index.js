import express from 'express';
var router = express.Router();
import {getReviews} from "../controllers/reviewController.js";
import {newDiscussion, getDiscussions, getMessages, newMessage, newImage} from "../controllers/discussionController.js";

//will match requests to /getReviews
router.get('/getReviews', getReviews)

router.post('/newDiscussion', newDiscussion)

router.get('/getDiscussions', getDiscussions)

router.get('/getMessages', getMessages)

router.post("/newMessage", newMessage);

router.post("/newImage", newImage);



export default router;
