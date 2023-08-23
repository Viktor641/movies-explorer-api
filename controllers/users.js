const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BedRequestError = require('../errors/BedRequestError');
const ConflictError = require('../errors/ConflictError');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BedRequestError('Переданы некорректные данные при редактировании пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой email уже существует на сервере.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  updateUser,
};
