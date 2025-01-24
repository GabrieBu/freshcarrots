var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET reviews. */
router.get('/getReviews', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3001/getReviews', {
      params: req.query // Pass all query parameters dynamically
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getReviews ' + error.message);
  }
});

/* @TODO impelement it frontend side */
/* GET reviews by movie. */
router.get('/getReviewsByMovie', async function(req, res, next) {
  const { movie_title } = req.query;
  try {
    const response = await axios.get(
        'http://localhost:3001/getReviewsByMovie', { params: { movie_title } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occurred: getReviewsByMovie ' + error.message);
  }
});



module.exports = router;
