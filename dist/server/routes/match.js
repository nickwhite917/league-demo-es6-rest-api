'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _match = require('../controllers/match');

var _match2 = _interopRequireDefault(_match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
router.route('/:userId')
/** GET /api/match/:userId - Get user */
.get(_match2.default.list);

/** Load user when API with userId route parameter is hit */
router.param('userId', _match2.default.load);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=match.js.map
