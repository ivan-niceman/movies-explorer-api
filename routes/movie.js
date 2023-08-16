const router = require("express").Router();
const { getMovies, createMovie, deleteMovie } = require("../controllers/movie");
const {
  createMovieValidate,
  deleteMovieValidate,
} = require("../middlewares/validation");

router.get("/movies", getMovies);
router.post("/movies", createMovieValidate, createMovie);
router.delete("/movies/:movieId", deleteMovieValidate, deleteMovie);

module.exports = router;
