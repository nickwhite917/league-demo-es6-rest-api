import User from '../models/user';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id).then((user) => {
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get match list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 5 } = req.query;
  User.listMatches({ limit }, req.user).then((users) => res.json(users))
    .error((e) => next(e));
}

export default { load, list };
