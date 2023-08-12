const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const {
  createMovieValidate,
  deleteMovieValidate,
} = require('../middlewares/validate');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidate, createMovie);
router.delete('/movies/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
