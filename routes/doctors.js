const router = require('express').Router();
const { getDoctorsWrite, createMovies, deleteMovies } = require('../controllers/movies');
const { createMoviesValidator, deleteMoviesValidator } = require('../middlewares/celebrate');

router.get('/', getDoctorsWrite);
router.post('/', createMoviesValidator, createMovies);

router.delete('/:movieId', deleteMoviesValidator, deleteMovies);
module.exports = router;
