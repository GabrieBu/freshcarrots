var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET movies */
router.get('/getMovies', async function(req, res, next) {
  try {
    const response = await axios.get(
        'http://localhost:3002/getMovies');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getMovies ' + error.message);
  }
});

/* GET actors */
router.get('/getActors', async function(req, res, next) {
  try {
    const response = await axios.get(
        'http://localhost:3002/getActors');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getActors ' + error.message);
  }
});

/* GET reviews. */
router.get('/getReviews', async function(req, res, next) {
  try {
    const response = await axios.get(
        'http://localhost:3001/getReviews', {params: req.query});
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getReviews ' + error.message);
  }
});

module.exports = router;
