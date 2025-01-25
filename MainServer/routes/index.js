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

/* GET top 5. */
router.get('/getTopFiveMovies', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/findTopFiveMovies');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getTopFiveMovies ' + error.message);
  }
});

module.exports = router;
