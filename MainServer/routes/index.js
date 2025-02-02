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
    const response = await axios.get('http://localhost:3002/movies/getTopFiveMovies');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getTopFiveMovies ' + error.message);
  }
});

/* POST new discussion. */
router.post('/newDiscussion', async function(req, res, next) {
  try {
    await axios.post('http://localhost:3001/newDiscussion', req.body);
    res.status(200).json({ message: "Discussion created!"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* GET past discussions */
router.get('/getDiscussions', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3001/getDiscussions');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getDiscussions ' + error.message);
  }
});

router.get('/getMessages', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3001/getMessages', {
      params: req.query // pass all query parameters to the express_server
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: getMessages ' + error.message);
  }
});

router.post('/newMessage', async function(req, res, next) {
  try {
    const response = await axios.post('http://localhost:3001/newMessage', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: newImage ' + error.message);
  }
});

router.post('/newImage', async function(req, res, next) {
  console.log(JSON.stringify(req.body));
  try {
    const response = await axios.post('http://localhost:3001/newImage', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: newMessage ' + error.message);
  }
});

router.get('/topRated', async function(req, res, next) {
  console.log("params: " + JSON.stringify(req.query));
  try {
    const response = await axios.get('http://localhost:3002/movies/topRated', {
      params: req.query
    });
    console.log("response: " + JSON.stringify(response.data));
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: newMessage ' + error.message);
  }
});

router.get('/getMovieById', async function(req, res, next) {
  console.log("params: " + JSON.stringify(req.query));
  try {
    const response = await axios.get('http://localhost:3002/movies/getMovieById', {
      params: req.query
    });
    console.log("response: " + JSON.stringify(response.data));
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: newMessage ' + error.message);
  }
});

router.get('/getMovieByName', async function(req, res, next) {
  console.log("params: " + JSON.stringify(req.query));
  try {
    const response = await axios.get('http://localhost:3002/movies/getMovieByName', {
      params: req.query
    });
    console.log("response: " + JSON.stringify(response.data));
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: newMessage ' + error.message);
  }
});

router.get('/ageMin', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/movies/ageMin', {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: ageMin ' + error.message);
  }
});

router.get('/getWorldwideMovies', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/movies/getWorldwideMovies')
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: /getCultLanguage ' + error.message);
  }
});

router.get('/getCultLanguage', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/movies/getCultLanguage', {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: /getCultLanguage ' + error.message);
  }
});

router.get('/getFilteredMovies', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/movies/getFilteredMovies', {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: /getFiltered ' + error.message);
  }
});

router.get('/getGenres', async function(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3002/genres/getGenres', {
      params: req.query
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error occured: /getGenres ' + error.message);
  }
});

module.exports = router;
