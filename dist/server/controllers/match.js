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
 * Get match list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @returns {User[]}
 */
function list(req, res, next) {
  var _req$query$limit = req.query.limit;
  var limit = _req$query$limit === undefined ? 5 : _req$query$limit;

  _user2.default.listMatches({ limit: limit }, req.user).then(function (users) {
    return res.json(users);
  }).error(function (e) {
    return next(e);
  });
}

exports.default = { load: load, list: list };
module.exports = exports['default'];
//# sourceMappingURL=match.js.map
