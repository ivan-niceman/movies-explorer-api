const movieModel = require("../models/movie");
const BadRequest = require("../utils/BadRequest");
const Forbidden = require("../utils/Forbidden");
const NotFound = require("../utils/NotFound");

const getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequest("Переданы некорректные данные"));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      movieModel
        .deleteOne({ _id: movie._id, owner: req.user._id })

        .then((result) => {
          if (result.deletedCount === 0) {
            next(new Forbidden("Невозможно удалить фильм"));
          } else {
            res.send({ message: "Фильм удалён" });
          }
        });
    })

    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFound("Карточка с таким id не найдена"));
      }
      if (err.name === "CastError") {
        return next(new BadRequest("Переданы некорректные данные"));
      }
      return next(err);
    });
};

// const deleteMovie = (req, res, next) => {
//   console.log(req.user._id);
//   return movieModel
//     .findById(req.params.movieId)
//     .orFail(() => {
//       throw new NotFound("Фильм с указанным _id не найден");
//     })
//     .then((movie) => {
//       if (movie.owner.toString() === req.user._id) {
//         return movieModel
//           .findByIdAndRemove(req.params.movieId)
//           .then(() => res.status(200).send(movie));
//       }
//       throw new Forbidden("Вы не можете удалить чужую карточку");
//     })
//     .catch((err) => {
//       if (err.name === "CastError") {
//         throw new BadRequest(
//           "Переданы некорректные данные при удалении карточки фильма"
//         );
//       }
//       throw err;
//     })
//     .catch(next);
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
