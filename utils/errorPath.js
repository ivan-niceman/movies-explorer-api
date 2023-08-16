const NotFound = require("./NotFound");

const errorPath = (req, res, next) => next(new NotFound("Страница не найдена"));

module.exports = errorPath;
