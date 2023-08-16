const usersModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../utils/Auth");
const NotFound = require("../utils/NotFound");
const Conflict = require("../utils/Conflict");
const BadRequest = require("../utils/BadRequest");

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    usersModel
      .create({ name, email, password: hash })
      .then(({ name, email, password }) => {
        res.status(201).send({ name, email, password });
      })
      .catch((err) => {
        if (err.name === "MongoServerError") {
          return next(new Conflict("Такой пользаватель уже существует"));
        }
        if (err.name === "ValidationError") {
          return next(new BadRequest("Переданы некорректные данные"));
        }
        return next(err);
      })
  );
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return usersModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "secret-key",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === "Error") {
        return next(new Auth(" Неправильная почта или пароль"));
      }
      return next(err);
    });
};

const getMe = (req, res, next) => {
  usersModel
    .findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFound("Пользователь с указанным _id не найден"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  usersModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    )
    .orFail(() => {
      throw new NotFound("Пользователь с указанным _id не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequest("Переданы некорректные данные"));
      } else if (err.code === 11000) {
        return next(new Conflict("Такой пользаватель уже существует"));
      }
      return next(err);
    });
};

module.exports = {
  updateUser,
  login,
  createUser,
  getMe,
};
