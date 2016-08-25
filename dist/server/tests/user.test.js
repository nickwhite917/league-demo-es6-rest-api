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

describe('## User APIs', function () {
  var user = {
    username: 'Nick123',
    mobileNumber: '1234567890',
    profile: {
      age: 23,
      gender: 'Male',
      religion: 'Jewish',
      location: {
        coordinates: [100, 150]
      }
    },
    preferences: {
      gender: 'Female',
      ageHigh: 40,
      ageLow: 20,
      religion: 'Jewish',
      distance: 20
    }
  };

  describe('# POST /api/users', function () {
    it('should create a new user', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).post('/api/users').send(user).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.username).to.equal(user.username);
        (0, _chai.expect)(res.body.mobileNumber).to.equal(user.mobileNumber);

        (0, _chai.expect)(res.body.profile.age).to.equal(user.profile.age);
        (0, _chai.expect)(res.body.profile.gender).to.equal(user.profile.gender);
        (0, _chai.expect)(res.body.profile.religion).to.equal(user.profile.religion);
        (0, _chai.expect)(res.body.profile.location.toString()).to.equal(user.profile.location.toString());

        (0, _chai.expect)(res.body.preferences.gender).to.equal(user.preferences.gender);
        (0, _chai.expect)(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
        (0, _chai.expect)(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
        (0, _chai.expect)(res.body.preferences.religion).to.equal(user.preferences.religion);
        (0, _chai.expect)(res.body.preferences.distance).to.equal(user.preferences.distance);

        user = res.body;
        done();
      });
    });
  });

  describe('# GET /api/users/:userId', function () {
    it('should get user details', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/' + user._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.username).to.equal(user.username);
        (0, _chai.expect)(res.body.mobileNumber).to.equal(user.mobileNumber);

        (0, _chai.expect)(res.body.profile.age).to.equal(user.profile.age);
        (0, _chai.expect)(res.body.profile.gender).to.equal(user.profile.gender);
        (0, _chai.expect)(res.body.profile.religion).to.equal(user.profile.religion);
        (0, _chai.expect)(res.body.profile.location.toString()).to.equal(user.profile.location.toString());

        (0, _chai.expect)(res.body.preferences.gender).to.equal(user.preferences.gender);
        (0, _chai.expect)(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
        (0, _chai.expect)(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
        (0, _chai.expect)(res.body.preferences.religion).to.equal(user.preferences.religion);
        (0, _chai.expect)(res.body.preferences.distance).to.equal(user.preferences.distance);
        done();
      });
    });

    it('should report error with message - Not found, when user does not exists', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users/56c787ccc67fc16ccc1a5e92').expect(_httpStatus2.default.NOT_FOUND).then(function (res) {
        (0, _chai.expect)(res.body.message).to.equal('Not Found');
        done();
      });
    });
  });

  describe('# PUT /api/users/:userId', function () {
    it('should update user details', function (done) {
      user.username = 'Nick12345';
      (0, _supertestAsPromised2.default)(_index2.default).put('/api/users/' + user._id).send(user).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.username).to.equal('Nick12345');
        (0, _chai.expect)(res.body.mobileNumber).to.equal(user.mobileNumber);

        (0, _chai.expect)(res.body.profile.age).to.equal(user.profile.age);
        (0, _chai.expect)(res.body.profile.gender).to.equal(user.profile.gender);
        (0, _chai.expect)(res.body.profile.religion).to.equal(user.profile.religion);
        (0, _chai.expect)(res.body.profile.location.toString()).to.equal(user.profile.location.toString());

        (0, _chai.expect)(res.body.preferences.gender).to.equal(user.preferences.gender);
        (0, _chai.expect)(res.body.preferences.ageHigh).to.equal(user.preferences.ageHigh);
        (0, _chai.expect)(res.body.preferences.ageLow).to.equal(user.preferences.ageLow);
        (0, _chai.expect)(res.body.preferences.religion).to.equal(user.preferences.religion);
        (0, _chai.expect)(res.body.preferences.distance).to.equal(user.preferences.distance);

        done();
      });
    });
  });

  describe('# GET /api/users/', function () {
    it('should get all users', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).get('/api/users').expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body).to.be.an('array');
        done();
      });
    });
  });

  describe('# DELETE /api/users/', function () {
    it('should delete user', function (done) {
      (0, _supertestAsPromised2.default)(_index2.default).delete('/api/users/' + user._id).expect(_httpStatus2.default.OK).then(function (res) {
        (0, _chai.expect)(res.body.username).to.equal('Nick12345');
        (0, _chai.expect)(res.body.mobileNumber).to.equal(user.mobileNumber);
        done();
      });
    });
  });
});
//# sourceMappingURL=user.test.js.map
