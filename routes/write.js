const router = require('express').Router();
const { getDoctorsWrite, writeDoctor, deleteMovies } = require('../controllers/write');
const { deleteMoviesValidator } = require('../middlewares/celebrate');

router.get('/', getDoctorsWrite);
router.post('/', writeDoctor);

router.delete('/:movieId', deleteMoviesValidator, deleteMovies);
module.exports = router;
