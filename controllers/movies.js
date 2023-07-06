const movieModel = require('../models/movie');
const NotFound = require('../errors/notfound');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/badrequest');

const getMovies = (req, res, next) => {
  movieModel
    .find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  movieModel
    .create({ owner: req.user._id, ...req.body })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFound('Такого фильма не существует');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new Forbidden('Невозможно удалить данный фильм');
      }
      movieModel
        .findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch(next);
};

const likeMovie = (req, res, next) => {
  movieModel
    .findByIdAndUpdate(
      req.params.movieId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найден');
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

const dislikeMovie = (req, res, next) => {
  movieModel
    .findByIdAndUpdate(
      req.params.movieId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найден');
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
  likeMovie,
  dislikeMovie,
};
