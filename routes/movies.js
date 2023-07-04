const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { validateMovieBody, validationMovieId } = require('../middlewares/validate');

router.get('/', moviesController.getMovies);
router.post('/', validateMovieBody, moviesController.createMovie);
router.delete('/:movieId', validationMovieId, moviesController.deleteMovieById);

module.exports = router;
