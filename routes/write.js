const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { getDoctorsWrite, writeDoctor, deleteMovies, getDoctorsWriteRead, writeLogistic, writeMedical } = require('../controllers/write');
const { deleteMoviesValidator } = require('../middlewares/celebrate');

router.get('/', getDoctorsWrite);
router.get('/doctor', getDoctorsWriteRead);
router.post('/', writeDoctor);
router.post('/logistic', writeLogistic);
router.post('/medical', writeMedical);

router.delete('/:movieId', deleteMoviesValidator, deleteMovies);
module.exports = router;
