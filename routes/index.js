const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/users');

router.use('/signin', login);
router.use('/signup', createUser);

router.use(auth);

router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  next(new NotFoundError('Сервер с указанным адресом не найден'));
});

module.exports = router;
