'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _zipcodes = require('zipcodes');

var _zipcodes2 = _interopRequireDefault(_zipcodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Schema
 */
var UserSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  profile: {
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    religion: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    }
  },
  preferences: {
    gender: {
      type: {},
      required: true
    },
    ageHigh: {
      type: Number,
      required: true
    },
    ageLow: {
      type: Number,
      required: true
    },
    religion: {
      type: String,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get: function get(id) {
    return this.findById(id).execAsync().then(function (user) {
      if (user) {
        return user;
      }
      var err = new _APIError2.default('No such user exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$skip = _ref.skip;
    var skip = _ref$skip === undefined ? 0 : _ref$skip;
    var _ref$limit = _ref.limit;
    var limit = _ref$limit === undefined ? 50 : _ref$limit;

    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).execAsync();
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  listMatches: function listMatches() {
    var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref2$limit = _ref2.limit;
    var limit = _ref2$limit === undefined ? 5 : _ref2$limit;
    var user = arguments[1];

    return this.find().sort({ createdAt: -1 }).limit(limit).where('profile.age').gte(user.preferences.ageLow).where('_id').ne(user.id).where('profile.gender').equals(user.preferences.gender).where('profile.religion').equals(user.preferences.religion).execAsync().then(function (matches) {
      var matchesInDistance = [];
      matches.forEach(function (match) {
        if (_zipcodes2.default.distance(match.profile.zip, user.profile.zip) <= user.preferences.distance) {
          matchesInDistance.push(match);
        }
      });
      if (matchesInDistance) {
        return matchesInDistance;
      }
      var err = new _APIError2.default('No such user exists!', _httpStatus2.default.NOT_FOUND);
      return _bluebird2.default.reject(err);
    });
  }
};

/**
 * @typedef User
 */
exports.default = _mongoose2.default.model('User', UserSchema);
module.exports = exports['default'];
//# sourceMappingURL=user.js.map
