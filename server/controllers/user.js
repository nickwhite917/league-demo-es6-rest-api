import User from '../models/user';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id).then((user) => {
    req.user = user;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    profile: {
      age: req.body.profile.age,
      gender: req.body.profile.gender,
      religion: req.body.profile.religion || 'Unspecified',
      zip: req.body.profile.zip
    },
    preferences: {
      gender: req.body.preferences.gender,
      ageHigh: req.body.preferences.ageHigh,
      ageLow: req.body.preferences.ageLow,
      religion: req.body.preferences.religion || 'Unspecified',
      distance: req.body.preferences.distance || 20
    }
  });

  user.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.profile = {
    age: req.body.profile.age,
    gender: req.body.profile.gender,
    religion: req.body.profile.religion || 'Unspecified',
    zip: req.body.profile.zip
  };
  user.preferences = {
    gender: req.body.preferences.gender,
    ageHigh: req.body.preferences.ageHigh,
    ageLow: req.body.preferences.ageLow,
    religion: req.body.preferences.religion || 'Unspecified',
    distance: req.body.preferences.distance || 20
  };

  user.saveAsync()
    .then((savedUser) => res.json(savedUser))
    .error((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip }).then((users) => res.json(users))
    .error((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.removeAsync()
    .then((deletedUser) => res.json(deletedUser))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };
