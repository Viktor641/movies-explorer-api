const Movie = require('../models/movie');
const BedRequestError = require('../errors/BedRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => res.status(200).send({ movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ ...req.body, owner })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BedRequestError('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Передан несуществующий _id фильма.'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нельзя удалять чужие фильмы'));
      }

      return Movie.findByIdAndRemove(movieId).then(() => res.status(200).send(movie));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
