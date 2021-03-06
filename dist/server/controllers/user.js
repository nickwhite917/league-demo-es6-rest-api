'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  _user2.default.get(id).then(function (user) {
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  }).error(function (e) {
    return next(e);
  });
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
  var user = new _user2.default({
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

  user.saveAsync().then(function (savedUser) {
    return res.json(savedUser);
  }).error(function (e) {
    return next(e);
  });
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  var user = req.user;
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

  user.saveAsync().then(function (savedUser) {
    return res.json(savedUser);
  }).error(function (e) {
    return next(e);
  });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  var _req$query = req.query;
  var _req$query$limit = _req$query.limit;
  var limit = _req$query$limit === undefined ? 50 : _req$query$limit;
  var _req$query$skip = _req$query.skip;
  var skip = _req$query$skip === undefined ? 0 : _req$query$skip;

  _user2.default.list({ limit: limit, skip: skip }).then(function (users) {
    return res.json(users);
  }).error(function (e) {
    return next(e);
  });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  var user = req.user;
  user.removeAsync().then(function (deletedUser) {
    return res.json(deletedUser);
  }).error(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
module.exports = exports['default'];
//# sourceMappingURL=user.js.map
