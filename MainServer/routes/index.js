var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET movies */
router.get('/movies', async function(req, res, next) {
  try {
    const response = await axios.get(
        'http://localhost:3001/get_all_movies');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: get_movies ' + error.message);
  }
});


/* GET reviews */
router.get('/get_review/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const response = await axios.get(
        `http://localhost:3001/get_review_movie/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: get_review_movie ' + error.message);
  }
});


/* GET actors. */
router.get('/actor/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const response = await axios.get(
        'http://localhost:3002/get_actors_movie/${id}');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: get_actor_movie ' + error.message);
  }
});


module.exports = router;
