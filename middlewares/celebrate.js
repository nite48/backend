const { celebrate, Joi } = require('celebrate');
// const { isURL } = require('validator');

// // const checkURL = (value) => {
// //   if (!isURL(value, { require_protocol: true })) {
// //     throw new Error('Неправильный формат ссылки');
// //   }
// //   return value;
// // };
const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    role: Joi.string(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createWriteValidator = celebrate({
  body: Joi.object().keys({
    dateBirth: Joi.date().required(),
    doctor: Joi.string().required(),
    dateWtire: Joi.date().required(),
    time: Joi.string().required(),
  }),
});
const deleteMoviesValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  createWriteValidator,
  updateUserValidator,
  deleteMoviesValidator,
};
