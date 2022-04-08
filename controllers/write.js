const Write = require('../models/write');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalError = require('../errors/InternalError');
const ConflictError = require('../errors/ConflictError');

module.exports.getDoctorsWrite = (req, res, next) => {
  const owner = req.user._id;
  Write.find({ owner })
    .then((write) => res.status(200).send(write))
    .catch((err) => next(new InternalError(err)));
};

module.exports.writeDoctor = (req, res, next) => {
  console.info(req.body);
  const {
    dateBirth, doctor, dateWtire, time, name, family,
  } = req.body;
  Write.create({
    dateBirth, doctor, dateWtire, time, name, family,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      console.info(err);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переднаны некорректные данные'));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Данный фильм уже имеется в коллекции'));
      } else {
        next(new InternalError(err));
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Write.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Не найден фильм по переданному id'));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Это не ваш фильм'));
      }
      return movie.remove()
        .then((result) => res.send(result));
    })
    .catch((err) => {
      console.info(err);
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(new InternalError(err));
      }
    });
};
