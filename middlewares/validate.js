const { celebrate, Joi } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateEditUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string()
      .required()
      .pattern(/^[а-яА-Я\s0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/u),
    nameEN: Joi.string()
      .required()
      .pattern(/^[a-zA-Z\s0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/),
    trailerLink: Joi.string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/),
    thumbnail: Joi.string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/),
    owner: Joi.string().optional(),
    movieId: Joi.number().required(),
  }),
});

const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().hex().length(24),
  }),
});

const validationMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().hex().length(24)
      .required(),
  }),
});

module.exports = {
  validateUserBody,
  validateEditUserInfo,
  validateMovieBody,
  validationUserId,
  validationMovieId,
};
