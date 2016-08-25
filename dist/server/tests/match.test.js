'use strict';

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.config.includeStack = true;

describe('## Match APIs', function () {

  describe('# GET /api/match/:userId', function () {
    it('should get users matching preferences of userId user', function (done) {
      var userNick = {
        username: 'Nick White',
        mobileNumber: '1234567890',
        preferences: {
          gender: 'Female',
          ageHigh: 30,
          ageLow: 20,
          religion: 'None',
          distance: 20
        },
        profile: {
          age: 25,
          gender: 'Male',
          religion: 'None',
          location: {
            coordinates: ['100', '150']
          }
        }
      };
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/users').send(userNick).expect(_httpStatus2.default.OK).then(function (res) {
        userNick = res.body;
        (0, _supertestAsPromised2.default)(_index2.default).get('/api/match/' + userNick._id).expect(_httpStatus2.default.OK).then(function (res) {
          var matches = res.body;
          matches.forEach(function (match) {
            // Check age
            (0, _chai.expect)(match.profile.age).to.be.within(userNick.preferences.ageLow, userNick.preferences.ageHigh);
            // Check gender
            (0, _chai.expect)(match.profile.gender).to.equal(userNick.preferences.gender);
            // Check religion
            (0, _chai.expect)(match.profile.religion).to.equal(userNick.preferences.religion);
            // Check location
            (0, _chai.expect)(match.distance).to.be.at.most(userNick.preferences.distance);
          });
          done();
        });
      });
    });

    it('should report error with message - Not found, when user does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/matches/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      });
    });
  });
});
//# sourceMappingURL=match.test.js.map
