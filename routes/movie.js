const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Movie = require('../models/Movie');
// API end point POST /api/movies
// Desc add movies
// Access Private

router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('imageurl', 'Image URL is required')
        .not()
        .isEmpty(),
      check('summary', 'Summary is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, imageurl, summary } = req.body;
    try {
      const newMovie = {
        name,
        imageurl,
        summary,
      };
      const movie = await new Movie(newMovie);
      await movie.save();
      return res.send(movie);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// API end point GET /api/movies
// Desc get all movies
// Access Public

router.get('/', async (req, res) => {
  const movies = await Movie.find();
  if (!movies) {
    return res.status(400).json({ msg: 'No movies found' });
  }
  res.send(movies);
});
module.exports = router;
