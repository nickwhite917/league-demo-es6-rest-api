'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/users
  createUser: {
    body: {
      username: _joi2.default.string().required(),
      mobileNumber: _joi2.default.string().regex(/^[1-9][0-9]{9}$/).required(),
      profile: {
        age: _joi2.default.number().integer().min(18).max(100).required(),
        gender: _joi2.default.string().required(),
        religion: _joi2.default.string().required(),
        location: _joi2.default.object().required()
      },
      preferences: {
        gender: _joi2.default.string().required(),
        ageHigh: _joi2.default.number().integer().min(18).max(100).required(),
        ageLow: _joi2.default.number().integer().min(18).max(100).required(),
        religion: _joi2.default.string().required(),
        distance: _joi2.default.number().integer().min(0).max(250).required()
      }
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: _joi2.default.string().required(),
      mobileNumber: _joi2.default.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: _joi2.default.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=param-validation.js.map
