const router = require('express').Router();
const userRouter = require('./users');
const writeDoctor = require('./write');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { createUserValidator, loginValidator } = require('../middlewares/celebrate');

router.post(
  '/signin',
  loginValidator,
  login,
);

router.post(
  '/signup',
  createUserValidator,
  createUser,
);

router.use(auth);
router.use('/signout', logout);
router.use('/users', userRouter);
router.use('/write', writeDoctor);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
